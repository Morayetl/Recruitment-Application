import React from 'react';
import './Login.css';
//import { Affix, Button, Menu, Icon } from 'antd';
import LoginForm from './LoginForm';

class Login extends React.Component {
  render() {
    return (
      <div className="login-container">
        <div className="login-form-container">
          <LoginForm/>
        </div>      
      </div>
    );
  }
}

export default Login;
