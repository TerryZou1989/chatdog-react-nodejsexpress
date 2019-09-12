import React from 'react';
import './MessageBox.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Auth from '../../service/Auth';
import User from '../../service/User';
import Message from '../../service/Message';
import Sys from '../../common/System';
import config from '../../common/config';
const socket = require('socket.io-client')(config.server);

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    const loginUserRes = Auth.getLoginUser();
    var friend = this.props.friend;
    this.state = { friend: friend, loginUser: loginUserRes.data, time: new Date().getTime(), sendMessage: '', messages: [] };
    socket.emit('login', this.state.loginUser);
  }

  componentDidMount() {
    socket.on('new_message', (data) => {
      var friend = this.state.friend;
      if (data &&friend&& data.userId == friend._id) {
        var messages = this.state.messages;
        messages.push(data);
        this.setState({ messages: messages });
      }
    });
  }

  componentDidUpdate() {
    this.setMessageBoxToBottom();
  }

  /**
   * 父组建修改传值触发
   */
  componentWillReceiveProps(nextProps) {
    var friend = nextProps.friend;
    this.setState({ friend: friend }, async () => {
      await this.getMessageList();
    });
  }

  /**
   * 获取消息列表
   */
  async getMessageList() {
    const loginUser = this.state.loginUser;
    const friend = this.state.friend;
    if (loginUser && loginUser._id && friend && friend._id) {
      var res = await Message.getList(loginUser._id, friend._id);
      if (res.result) {
        this.setState({ messages: res.data });
      }
    }
  }

  /**
   * 消息置底部
   */
  setMessageBoxToBottom() {
    var box = document.getElementsByClassName('message-box')[0];
    if (box != undefined) {
      box.scrollTop = box.scrollHeight;
    }
  }

  /**
   * 发送消息
   * @param {*} e 
   */
  async doSend(e) {
    var loginUser = this.state.loginUser;
    var friend = this.state.friend;
    var message = this.state.sendMessage;
    var messages=this.state.messages;
    if (message && message.length > 0) {
      var newMessage={ userId: loginUser._id, toUserId: friend._id, message: message,date:Date.now() };
      messages.push(newMessage);
      var res = await Message.add(newMessage);
      if (res.result) {
        socket.emit('new_message', newMessage);
      }
      this.setState({ time: new Date().getTime(), sendMessage: '',messages:messages });
    }
  }

  doChangeMessage(e) {
    this.setState({ sendMessage: e.target.value });
  }

  render() {
    var loginUser = this.state.loginUser;
    var friend = this.state.friend;
    if (friend != undefined && friend._id) {
      var messageList = this.state.messages;
      const messageListHtml = messageList.map((message) =>

        <li key={message.id}>
          <div className={message.userId === loginUser._id ? 'myMessage' : 'friendMessage'}>
            {message.message}
            <br/>
            <span className={message.userId === loginUser._id ? 'messageDate l' : 'messageDate r'}>{Sys.formatDate(message.date)}</span>
          </div>
        </li>
      );

      this.setMessageBoxToBottom();

      return (
        <div className='container message-main'>
          <div className='row'>
            <div className='col p-0 message-friend'>
              {friend.name}
            </div>
          </div>
          <div className='row'>
            <div className='col p-0'>
              <div className='message-box'>
                <ul>
                  {messageListHtml}
                </ul>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col p-0'>
              <div className='container'>
                <div className='row'>
                  <div className='col p-0'>
                    <textarea className='messageTxt' rows='5' value={this.state.sendMessage} onChange={this.doChangeMessage.bind(this)}></textarea>
                  </div>
                </div>
                <div className='row'>
                  <div className='col p-0'>
                    <button className='btn btn-primary message-btn mr-2' onClick={this.doSend.bind(this)}>Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    }
    else {
      return (
        <div className='container message-main'>
        </div>
      );
    }
  }
}

export default MessageBox;
