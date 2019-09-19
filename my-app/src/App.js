import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Route ,Link} from 'react-router-dom';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';
import Chat from './components/chat/Chat';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={SignIn}></Route>
          <Route path='/signin' component={SignIn}></Route>
          <Route path='/signup' component={SignUp}></Route>
          <Route path='/chat' component={Chat}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
