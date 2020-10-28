import React from 'react';
import './Footer.css';
import { Button, Row } from 'antd';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { APP_NAME, SUPPORT_EMAIL, APP_PHONENUMBER, APP_SOCIAL_MEDIA } from '../../Utils/constants';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'employer'
    };
  }

  render() {
    return (
      <div className="footer">
        <div className="container">
          <Row type="flex" justify="center">
            <a href={'mailto:'+  SUPPORT_EMAIL}>
              <Button shape="circle" icon="mail"/>
            </a>
            <a href={APP_SOCIAL_MEDIA.INSTAGRAM} rel="noopener noreferrer" target="_blank">
              <Button shape="circle" icon="instagram"/>
            </a>
            <a href={APP_SOCIAL_MEDIA.TWITTER} rel="noopener noreferrer" target="_blank">
              <Button shape="circle" icon="twitter"/>
            </a>
            <a href={'tel:'+  APP_PHONENUMBER}>
              <Button shape="circle" icon="phone"/>
            </a>
          </Row>  
          <Row type="flex" justify="center">
            <Link to="/cookies-and-privacy" className="text">
              {this.props.t('footer-link-privacy-and-cookies')}
            </Link>  
            <Link to="/terms-of-use"  className="text">
              {this.props.t('footer-link-terms')}
            </Link>      
            <Link to="/jobs"  className="text">
              {this.props.t('footer-link-jobs')}
            </Link>  
            <Link to="/faq" className="text">
              {this.props.t('faq')}
            </Link>  
          </Row>     
          <Row type="flex" justify="center">
            <span className="text">
              ©Copyright 2020 - {APP_NAME}
            </span>        
          </Row>        
        </div>        
      </div>
    );
  }
}

export default withTranslation()(withRouter(connect()(Footer)));
