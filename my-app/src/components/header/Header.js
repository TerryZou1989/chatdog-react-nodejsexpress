import React from 'react';
import './Header.css';
import {BrowserRouter as Router , Route , Link } from 'react-router-dom';
import Auth from '../../service/Auth';

class Header extends React.Component {
  constructor(props) {
    super(props);
    const loginUserRes = Auth.getLoginUser();
    this.state = { user: loginUserRes.data, isLogin: loginUserRes.result };
    this.doLogout = this.doLogout.bind(this);
  }

  /**
   * 退出登录
   */
  doLogout(e) {
    Auth.logout();
    this.setState({ isLogin: false, user: null });
    window.location.href='/';
  }

  render() {
    const isLogin = this.state.isLogin;
    if (isLogin) {
      const loginUser = this.state.user;
      return (
        <div className='container'>
          <div className='row'>
            <div className='col p-0 header-box'>
              <div className='account-box'>
                <div className='current'>
                  <b>{loginUser.name}</b>
                </div>
                <div className='logout' onClick={this.doLogout}>
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col p-0 header-box'>
              <div className='account-box'>
                <div className='logout'>
                  <Router>
                  <Link to='/signin'>Sign In</Link>
                  </Router>
                </div>
                <div className='logout'>
                  <Router>
                  <Link to='/signup'>Sign Up</Link>
                  </Router>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Header;
