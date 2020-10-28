import React from 'react';
import './RecruiterSideMenu.css';
import { Menu, Icon } from 'antd';
import { withRouter } from "react-router";
import cookie from 'js-cookie';
import auth from '../../../Utils/auth';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';


class RecruiterSideMenu extends React.Component {
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
          selectedKeys={[this.props.location.pathname]}
          mode="inline"
          theme="light"
        >
          <Menu.Item key="/employer/company-profile">
            <Icon type="profile" />
            <span>{this.props.t('recruiter-menu-item-company-profile')}</span>
          </Menu.Item>        
          <Menu.Item key="/employer/manage-jobs">
            <Icon type="file-search" />
            <span>{this.props.t('recruiter-menu-item-manage-jobs')}</span>
          </Menu.Item>
          <Menu.Item key="/employer/transactions">
            <Icon type="transaction" />
            <span>{this.props.t('recruiter-menu-item-transactions')}</span>
          </Menu.Item>
          <Menu.Item key="/employer/packages">
            <Icon type="gift" />
            <span>{this.props.t('recruiter-menu-item-purchased-items')}</span>
          </Menu.Item>                                     
          <Menu.Item key="/employer/change-password">
            <Icon type="lock" />
            <span>{this.props.t('change-password')}</span>
          </Menu.Item>      
          <Menu.Item key="logout" onClick={this.onLogout}>
            <Icon type="logout" />
            <span>{this.props.t('logout')}</span>
          </Menu.Item>              
        </Menu>        
      </div>

    );
  }
}

/**
 *           
  <Menu.Item key="/employer/job-application-alerts">
    <Icon type="alert"/>
    <span>{this.props.t('recruiter-menu-item-job-application-alerts')}</span>
  </Menu.Item>
 */

const redux = withTranslation()(connect()(RecruiterSideMenu))
export default withRouter(redux);
