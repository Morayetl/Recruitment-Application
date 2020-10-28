import React from 'react';
import './CandidateSideMenu.css';
import { withRouter } from "react-router";
import { Menu, Icon } from 'antd';
import cookie from 'js-cookie';
import auth from '../../../Utils/auth';
import { connect } from 'react-redux';
import i18next from 'i18next';

class CandidateSideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.page ? this.props.page : 'company-profile'
    };

    this.handleClick = this.handleClick.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  handleClick(e) {
    if(e.key === 'logout'){
      this.props.history.push('');
      return;
    }
    this.props.history.push(e.key);
  };

  onLogout(){
    auth.logout(this.props.history,cookie, this.props.dispatch);
  }
  
  render() {
    return (
      <div style={{ paddingTop:'20px'}} className="employer-side-menu">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.props.location.pathname !== '/user/logout' ? this.props.location.pathname : null]}
          mode="inline"
          theme="light"
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
          <Menu.Item key="/user/logout" onClick={this.onLogout}>
            <Icon type="logout" />
            <span>{i18next.t('logout')}</span>
          </Menu.Item>                 
        </Menu>        
      </div>

    );
  }
}

const redux = connect()(CandidateSideMenu)
export default withRouter(redux);