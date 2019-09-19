import React from 'react';
import './SignIn.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Auth from '../../service/Auth';
import Header from '../header/Header';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    //检测用户是否已登录
    const loginUserRes = Auth.getLoginUser();
    this.state = { email: "", password: "", isLogin: loginUserRes.result };
    this.doLogin = this.doLogin.bind(this);
    this.doChangeEmail = this.doChangeEmail.bind(this);
    this.doChangePassword = this.doChangePassword.bind(this);
  }

  /**
   * 通过邮箱和密码登录
   */
  async doLogin(e) {
    var scope = this;
    //方式submit post返回
    e.preventDefault();
    var res = await Auth.login(this.state.email, this.state.password);
    if (res.result) {
      scope.setState({ isLogin: res.result });
    }
    else {
      alert(res.message);
    }
  }

  doChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  doChangePassword(e) {
    this.setState({ password: e.target.value });
  }


  render() {
    const islogin = this.state.isLogin;
    if (!islogin) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col p-0'>
              <Router>
                <Header />
              </Router>
            </div>
          </div>
          <div className='row'>
            <div className='col p-0'>
              <div className='login-box'>
                <form onSubmit={this.doLogin}>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" id="txtEmail" placeholder="Enter email" value={this.state.email} onChange={this.doChangeEmail} />
                  </div>
                  <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" id="txtPassword" placeholder="Password" value={this.state.password} onChange={this.doChangePassword} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<Redirect to='/chat'></Redirect>);
    }
  }
}

export default SignIn;
