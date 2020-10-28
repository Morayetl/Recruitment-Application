import React from 'react';
import './ConfirmEmail.css';
import { Row, Button, Input, Form, Icon } from 'antd';
import axios from '../../Utils/axios';
import { withRouter } from "react-router";
import i18next from 'i18next';
import logo from '../../icons/logo1.svg';
import { Link } from "react-router-dom";

class ConfirmEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: true,
      resendSent: false,
      resendVerification: false
    };

    this.onReturnButtonClick = this.onReturnButtonClick.bind(this);
    this.resendEmailVerification = this.resendEmailVerification.bind(this);
    this.verificationSuccess = this.verificationSuccess.bind(this);
    this.showVerificationView = this.showVerificationView.bind(this);
    this.verificationFailed = this.verificationFailed.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = new URLSearchParams([['email',values.email]]); 

        axios.post('/user/resend-email-verification?'+params.toString()).then(() =>{
          this.setState({resendSent: true});
        });
      }
    });
  };

  componentDidMount(){
    const queryParams= window.location.search;
    const params = new URLSearchParams(queryParams); 

    // if token and email not found set mode to resend verification without errors
    if(!params.get('token') || !params.get('email')){
      this.setState({resendVerification: true});
      return;
    }

    axios.post('/user/verify-email?'+params.toString()).then(() =>{
      this.setState({verified: true});
    }, ()=>{
      this.setState({verified: false});
    });    
  }

  onReturnButtonClick(){
    this.props.history.push('/');
  }

  verificationSuccess(){
    return (
      <div>
        <Row justify="center" type="flex">
          <h1 align="center">
            { i18next.t('confirm-email-success-title') }
          </h1>
        </Row>
        <Row justify="center" type="flex">
          <p className="confirm-email-paragraph">
            { i18next.t('confirm-email-success-paragraph') }
          </p>
        </Row>
        <Row justify="center" type="flex">
          <Button onClick={this.onReturnButtonClick} type="primary" size="large" block={true}>
            { i18next.t('return-to-front-page') }
          </Button>
        </Row>                
      </div>
    )
  }

  verificationFailed(){
    return (
      <div>
        <Row justify="center" type="flex">
          <h1 align="center">
            { i18next.t('confirm-email-failed-title') }
          </h1>
        </Row>
        <Row justify="center" type="flex">
          <p className="confirm-email-paragraph">
            { i18next.t('confirm-email-failed-paragraph') }
          </p>
        </Row>
        <Row justify="center" type="flex">         
          {this.resendEmailVerification()}
        </Row>
      </div>
    )
  }

  resendEmailVerification(){
    const { getFieldDecorator } = this.props.form;
    return (
        this.state.resendSent ? (
          <div>
            <div>
            <p className="confirm-email-paragraph" style={{color: 'black'}}>
              <Icon style={{color: 'green', marginRight: '5px'}} type="check-circle" />
              { i18next.t('confirm-email-failed-resend-message') } 
            </p>
            </div>
            <Button onClick={this.onReturnButtonClick} type="primary" size="large" block={true}>
              { i18next.t('return-to-front-page') }
            </Button>                        
          </div>
        ) : 
        <Form onSubmit={this.handleSubmit} style={{width: '100%'}}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: i18next.t('error-message-required-email') },
                {
                  type: 'email',
                  message: i18next.t('error-message-invalid-email')
                }
              ],
            })(
              <Input size="large"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={ i18next.t('email-address') }
              />
            )}
          </Form.Item>  
          <Row>
            <Button className="confirm-email-verify-button" htmlType="submit"  size="large" block={true}>
              { i18next.t('confirm-email-failed-button') }
            </Button>    
          </Row>    
        </Form> 
    );
  }

  showVerificationView(){
    return this.state.verified ? this.verificationSuccess() : this.verificationFailed();
  }

  resendEmailVerificationView(){
    return (
      <div>
        <Row justify="center" type="flex">
          <h1 align="center">
            { i18next.t('confirm-email-resend-title') }
          </h1>
        </Row>        
        {this.resendEmailVerification() }
      </div>
    );
  }
  render() {
    return (
      <div className="confirm-email-container default-background">
        <div className="confirm-email-form-container">
          <Row style={{marginBottom: '20px'}} justify="center" type="flex">
            <Link to="/">
              <Icon component={logo} style={{fontSize: '80px'}} />            
            </Link>
          </Row>
          { this.state.resendVerification ? this.resendEmailVerificationView() : this.showVerificationView() }
        </div> 
      </div>
    );
  }
}

export default Form.create({ name: 'confirm-user' })(withRouter(ConfirmEmail));
