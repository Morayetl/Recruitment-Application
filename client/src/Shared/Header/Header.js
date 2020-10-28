import React from 'react';
import './Header.css';
import { Menu, Icon, Avatar, Row, Select } from 'antd';
import { Link } from "react-router-dom";
import LoginModal from '../Modals/LoginModal/LoginModal';
import SignUpModal from '../Modals/SignUpModal/SignUpModal';
import { withRouter } from "react-router";
import cookie from 'js-cookie';
import auth from '../../Utils/auth';
import { connect } from 'react-redux';
import { USER_ROLES, COOKIES, APP_NAME, COOKIES_SECURE } from '../../Utils/constants';
import i18next from 'i18next';
import logo from '../../icons/logo1.svg';
import logo2 from '../../icons/logo2.svg';

import engFlagIcon from '../../icons/uk-flag.svg';
import fiFlagIcon from '../../icons/finland-flag.svg';
import { Button } from 'antd/lib/radio';

const { SubMenu } = Menu;
const { Option } = Select;

const style = {
  menuContainer: {
  },
  menu: {
    //padding: '10px 10px 10px 10px'
    width: 'auto !important',
    background: 'blue',
  },
  menuitemFloatRight: {
    float: 'right'
  },
  recruitersButton: {
    background: 'transparent',
    borderColor: 'orange'
  },
  jobseekersButton: {
    background: 'transparent',
    borderColor: 'blue'
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'employer'
    };
    this.onLogout = this.onLogout.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.showLogo = this.showLogo.bind(this);
  }

  handleClick = e => {
    if(!e.key) return;

    // for unknown reason signup modal keeps sending user to sign-up hidden page so we will block that too
    if(e.key === 'login' || e.key === 'sign-up' || e.key === 'logout' || e.key === 'sign-up-hidden'){
      return;      
    }

    this.props.history.push(e.key);
    this.setState({
      current: e.key,
    });
  };
  
  hideForEmployers(){
    const auth = cookie.get(COOKIES.authorization);
    if(!auth){
      return(
        <Menu.Item className="header-item-no-border" key="employers" style={style.menuitemFloatRight}>
          <Link to="/employers">
            { i18next.t('for-employers') }
          </Link>
        </Menu.Item>
      )
    }
    return null
  }

  hideRegistering(){
    const auth = cookie.get(COOKIES.authorization);
    if(!auth){
      return(
        <Menu.Item className="header-item-no-border" key="sign-up" style={style.menuitemFloatRight}>
          <SignUpModal/>
        </Menu.Item>
      )
    }
    return null
  }
  
  hideAuth(){
    const auth = cookie.get(COOKIES.authorization);
    if(!auth){
      return(
        <Menu.Item className="header-item-no-border" key="login" style={style.menuitemFloatRight}>
          <LoginModal/>
        </Menu.Item>  
      )
    }
    return null
  }

  onLogout(){
    auth.logout(this.props.history, cookie, this.props.dispatch);
  }

  showEmployerMenu(){
    return(
      <SubMenu
      style={style.menuitemFloatRight}
      title={
            <Avatar shape="square" >
              <Icon type="user" style={{margin: 'auto'}}/>
            </Avatar>
      }
      >     
          <Menu.Item key="/employer/company-profile">
            <Icon type="profile" />
            <span>{i18next.t('recruiter-menu-item-company-profile')}</span>
          </Menu.Item>        
          <Menu.Item key="/employer/manage-jobs">
            <Icon type="file-search" />
            <span>{i18next.t('recruiter-menu-item-manage-jobs')}</span>
          </Menu.Item>
          <Menu.Item key="/employer/transactions">
            <Icon type="transaction" />
            <span>{i18next.t('recruiter-menu-item-transactions')}</span>
          </Menu.Item>
          <Menu.Item key="/employer/packages">
            <Icon type="gift" />
            <span>{i18next.t('recruiter-menu-item-purchased-items')}</span>
          </Menu.Item>                                     
          <Menu.Item key="/employer/change-password">
            <Icon type="lock" />
            <span>{i18next.t('change-password')}</span>
          </Menu.Item>      
          <Menu.Item key="logout" onClick={this.onLogout}>
            <Icon type="logout" />
            <span>{i18next.t('logout')}</span>
          </Menu.Item>            
      </SubMenu>
    );
  }

/** TODO: implement later
  <Menu.Item key="/employer/job-application-alerts">
    <Icon type="alert"/>
    <span>{i18next.t('recruiter-menu-item-job-application-alerts')}</span>
  </Menu.Item>
 */
  showEmployeeMenu(){

    return(
      <SubMenu
      style={style.menuitemFloatRight}
      title={
        <Avatar shape="square" >
          <Icon type="user" style={{margin: 'auto'}}/>
        </Avatar>
      }
      >
          <Menu.Item key="/user/profile">
            <Icon type="profile" />
            <span>{i18next.t('candidate-menu-item-my-profile')}</span>
          </Menu.Item>      
          <Menu.Item key="/user/resume">
            <Icon type="file-text" />
            <span>{i18next.t('candidate-menu-item-my-resume')}</span>
          </Menu.Item>               
          <Menu.Item key="/user/attachments">
            <Icon type="paper-clip" />
            <span>{i18next.t('candidate-menu-item-attachments')}</span>
          </Menu.Item>
          <Menu.Item key="/user/applied-jobs">
            <Icon type="gift" />
            <span>{i18next.t('candidate-menu-item-applied-jobs')}</span>
          </Menu.Item>                                     
          <Menu.Item key="/user/job-alerts">
            <Icon type="alert"/>
            <span>{i18next.t('candidate-menu-item-job-alert')}</span>
          </Menu.Item>
          <Menu.Item key="/user/change-password">
            <Icon type="lock" />
            <span>{i18next.t('change-password')}</span>
          </Menu.Item>      
          <Menu.Item key="logout" onClick={this.onLogout}>
            <Icon type="logout" />
            <span>{i18next.t('logout')}</span>
          </Menu.Item>      
      </SubMenu>
    );

    
  }

  showUserMenu(){
    const role = cookie.get('role');
    switch(role){
      case 'employer':
        return this.showEmployerMenu();
      case 'employee':
        return this.showEmployeeMenu();
      default:
        return null;
    }
  }

  /**
   * TODO: implement package deals
   */
  showPricingPlan(){
    const role = cookie.get('role');
    if(role === USER_ROLES.employer){
      return (
        <Menu.Item key="/products" style={style.menuitemFloatRight}>
          <Link to="/products">
            {i18next.t('pricing-and-plans')}
          </Link>
        </Menu.Item>
      )
    }
  }

  /**
   * Shows post job button if role is employer
   */
  showPostjobButton(){
    const role = cookie.get('role');
    if(role === USER_ROLES.employer){
      return (
        <Menu.Item className="header-item-no-cursor header-item-no-border" key="/post-new-job" style={style.menuitemFloatRight}>
          <Link to="/post-new-job">
            <Button shape="round">
              {i18next.t('post-new-job')}
            </Button>        
          </Link>
        </Menu.Item>
      )
    }
  }

  /**
   * Changes language
   * @param {*} value 
   */
  handleLanguageChange(value){
    cookie.set(COOKIES.language, value, { path: '/', secure: COOKIES_SECURE, expires: 5000, 'samesite': 'strict'}); 
    window.location.reload();
  }

  changeLanguage(){
    return(
      <Menu.Item className="header-item-no-cursor" disabled={true} key="/language" style={{...style.menuitemFloatRight, borderColor: 'transparent', cursor: 'auto !important'}}>
        <div className="header-language-select">
          <Row>
            <Select value={i18next.languages[0]} onChange={this.handleLanguageChange} style={{ background:'transparent'}} dropdownStyle={{background:'white'}} dropdownMenuStyle={{margin: 0, padding: 0}}>
              <Option value="en" className="header-language-select-drop-down-item">
                <Icon style={{fontSize: '30px', background:'transparent'}} component={engFlagIcon} />
              </Option>
              <Option value="fi" className="header-language-select-drop-down-item">
                <Icon style={{fontSize: '30px', background:'transparent'}} component={fiFlagIcon}/>
              </Option>
            </Select>            
          </Row>             
        </div>
      </Menu.Item>

    );
  }
  
  showLogo(){
    const currentlogo = this.props.location.pathname === '/' ? logo2 : logo;
    return (
      <Icon component={currentlogo} style={{fontSize: '30px', transform: 'translateY(5px)'}}/>
    )
  }
  render() {
    return (
      <Menu className="header" style={style.menu} onClick={this.handleClick} selectedKeys={[this.props.location.pathname]} mode="horizontal">
        <Menu.Item key="/">
          <Link to="/">
            {
              this.showLogo()
            }
            <span style={{height: '100%'}}>
              {APP_NAME}                 
            </span>
          </Link>
        </Menu.Item>
        { this.showUserMenu()}
        { this.changeLanguage() }
        { this.showPostjobButton() }
        { this.hideForEmployers() }
        { this.hideRegistering() }
        { this.hideAuth() }    
        <Menu.Item key="/jobs" style={style.menuitemFloatRight}>
          <Link to="/jobs">
            {i18next.t('jobs')}
          </Link>
        </Menu.Item>
      </Menu>    
    );
  }
}

export default withRouter(connect()(Header));
