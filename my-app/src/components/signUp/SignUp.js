import React from 'react';
import './SignUp.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Auth from '../../service/Auth';
import Header from '../header/Header';
import User from '../../service/User';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    Auth.logout();//不管等没登录，都登出
    this.state = { email: "", password: "",name:'',isSignUp:false};
    this.doSignUp = this.doSignUp.bind(this);
    this.doChangeName = this.doChangeName.bind(this);
    this.doChangeEmail = this.doChangeEmail.bind(this);
    this.doChangePassword = this.doChangePassword.bind(this);
  }

  /**
   * 注册用户事件
   */
  async doSignUp(e) {
    //方式submit post返回
    e.preventDefault();
    var res =await User.add({name:this.state.name,email:this.state.email,password:this.state.password});
    if (res.result) {
      this.setState({isSignUp:true});
      alert(res.message);
    }
    else {
      alert("create acccount failed:"+res.message);
    }
  }

  
  doChangeName(e) {
    this.setState({ name: e.target.value });
  }
  doChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  doChangePassword(e) {
    this.setState({ password: e.target.value });
  }


  render() {
    const isSignUp = this.state.isSignUp;
    if (!isSignUp) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col p-0'>
              <Header />
            </div>
          </div>
          <div className='row'>
            <div className='col p-0'>
              <div className='login-box'>
                <form onSubmit={this.doSignUp}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" id="txtName" placeholder="Enter name" value={this.state.name} onChange={this.doChangeName} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" id="txtEmail" placeholder="Enter email" value={this.state.email} onChange={this.doChangeEmail} />
                  </div>
                  <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" id="txtPassword" placeholder="Password" value={this.state.password} onChange={this.doChangePassword} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Create Account</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<Redirect to='/signin'></Redirect>);
    }
  }
}

export default SignUp;
