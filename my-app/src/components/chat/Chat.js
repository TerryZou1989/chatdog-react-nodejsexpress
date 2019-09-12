import React from 'react';
import './Chat.css';
import { Redirect } from 'react-router-dom';
import Auth from '../../service/Auth';
import User from '../../service/User';
import Header from '../header/Header';
import MessageBox from '../messageBox/MessageBox';
import config from '../../common/config';
const socket = require('socket.io-client')(config.server);

class Chat extends React.Component {
  constructor(props) {
    super(props);
    const loginUserRes = Auth.getLoginUser();
    this.state = { user: loginUserRes.data, isLogin: loginUserRes.result, searchName: '', selectFriend: null, friends: [], users: [],messages:[] };
    this.getFriendList();
    socket.emit('login', this.state.user);
  }

  async componentDidUpdate() {

  }

  componentDidMount() {
    socket.on('new_message', (data) => {
      var friend = this.state.selectFriend;
      if (friend==null||(data && data.userId != friend._id)) {
        var messages = this.state.messages;
        messages.push(data);
        this.setState({ messages: messages });
      }
    });


    socket.on('new_friend', (data) => {
      var friends=this.state.friends;
      var f=friends.find(t=>t._id==data.friendId);
      if(f==null){
        friends.push({
          _id:data.friendId,
          name:data.friendName
        });
        this.setState({ friends: friends });;
      }
    });
  }

  /**
   * 获取好友列表
   */
  async getFriendList() {
    const isLogin = this.state.isLogin;
    if (isLogin) {
      const loginUser = this.state.user;
      var friendListRes = await User.getFriendList(loginUser._id);
      if (friendListRes.result) {
        this.setState({ friends: friendListRes.data })
      }
    }
  }

  /**
   * 获取搜索结果
   */
  async getSearchUserList() {
    var name = this.state.searchName;
    var res = await User.getList(name);
    if (res.result) {
      this.setState({ users: res.data });
    }
  }

  /**
   * 添加好友
   * @param {*} e 
   */
  async doAddFriend(e) {
    var loginUser = this.state.user;
    var friendId = e.target.getAttribute('userId');
    var res = await User.addFriend({ userId: loginUser._id, friendId: friendId });
    if (res.result) {
      socket.emit('new_friend', {userId:loginUser._id,userName:loginUser.name,friendId:friendId});
      await this.getFriendList();
    }
  }

  /**
   * 选择好友进行聊天
   * @param {*} e 
   */
  doSelectFriend(e) {
    var friendId = e.target.getAttribute('friendId');
    var friends = this.state.friends;
    var friend = friends.find(t => t._id == friendId);
    var messages=this.state.messages;
    var fmessages=messages.filter(t=>t.userId==friendId);
    fmessages.forEach((m)=>{
      messages.splice(messages.indexOf(m),1);
    });

    this.setState({ selectFriend: friend,messages:messages });
  }


  doChangeSearchName(e) {
    this.setState({ searchName: e.target.value }, async () => {
      await this.getSearchUserList();
    });
  }

  render() {
    const isLogin = this.state.isLogin;
    const loginUser = this.state.user;
    if (isLogin) {
      const messages=this.state.messages;
      const friendList = this.state.friends;// this.getFriendList();
      const friendListHtml = friendList.map((friend) =>
        <li key={friend._id} friendId={friend._id} onClick={this.doSelectFriend.bind(this)}>
          {friend.name}
          {messages.filter(t=>t.userId==friend._id).length>0?
           <span className='msgcount'> {messages.filter(t=>t.userId==friend._id).length}</span>
           :<span/>
           }
        </li>
      );

      const searchUserList = this.state.users;
      const searchUserListHtml = searchUserList.map((searchUser) =>

        <li key={searchUser._id} >
          <div className='container'>
            <div className='row'>
              <div className='col-8 p-0'>{searchUser.name}</div>
              {
                (friendList.find(t => t._id == searchUser._id) == null && loginUser._id != searchUser._id) ?
                  <div className='col-4 p-0'><button key={searchUser._id} userId={searchUser._id} className='btn btn-secondary btn-sm' onClick={this.doAddFriend.bind(this)}>Add</button></div>
                  :
                  <div className='col-4 p-0'></div>
              }

            </div>
          </div>
        </li>

      );

      const messageBoxHtml = <MessageBox friend={this.state.selectFriend} />;

      return (
        <div className='container'>
          <div className='row'>
            <div className='col p-0'>
              <Header />
            </div>
          </div>
          <div className='row mt-5'>
            <div className='col p-0'>
              <div className='chat-main'>
                <div className='container'>
                  <div className='row'>
                    <div className='col-2 p-0'>
                      <div className='chat-usertitle'>
                        My Friends
                      </div>
                      <div className='chat-userlist'>
                        <ul>
                          {friendListHtml}
                        </ul>
                      </div>
                    </div>
                    <div className='col-8 p-0'>
                      {messageBoxHtml}
                    </div>
                    <div className='col-2 p-0'>
                      <div className='chat-usertitle'>
                        Search User
                      </div>
                      <div className='chat-userlist'>
                        <ul>
                          <li className='p-0'>
                            <input type="text" className="form-control txt-SearchName" placeholder="Search Name" value={this.state.searchName} onChange={this.doChangeSearchName.bind(this)} />
                          </li>
                          {searchUserListHtml}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<Redirect to='/'></Redirect>);
    }
  }
}

export default Chat;
