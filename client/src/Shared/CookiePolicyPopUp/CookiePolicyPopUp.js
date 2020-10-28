import React from 'react';
import { Row, Button } from 'antd';
import i18next from 'i18next';
import { Link } from "react-router-dom";
import cookie from 'js-cookie';
import { COOKIES, COOKIES_SECURE } from '../../Utils/constants';

class CookiePolicyPopUp extends React.Component {

  constructor(props){
    super(props);
    this.onAcceptButtonClick = this.onAcceptButtonClick.bind(this);
    this.state = {
      cookiePolicyAgreement: cookie.get(COOKIES.cookiePolicyAgreement)
    }
  }

  onAcceptButtonClick(){
    cookie.set(COOKIES.cookiePolicyAgreement, "true", { path: '/', secure: COOKIES_SECURE, expires: 3700, 'samesite': 'strict'}); 
    this.setState({cookiePolicyAgreement: true});
  }
  render() {
    return (
      <div className="cookie-policy-popup">
        { this.state.cookiePolicyAgreement ? null : <div className="cookie-policy-popup-content">
          <Row>
            <h2>
              {i18next.t('cookies')}
            </h2>
          </Row>
          <Row>
            <p>
              {i18next.t('cookies-popup-paragraph')}
            </p>        
          </Row>
          <Row type="flex" justify="space-between">
            <Link style={{margin: '10px auto 10px 0px'}} to="/cookies-and-privacy">
              {i18next.t('read-more')}
            </Link>
            <Button onClick={this.onAcceptButtonClick}>
              {i18next.t('accept')}
            </Button>
          </Row>          
        </div>
        }
      </div>
    );
  }
}

export default CookiePolicyPopUp;
