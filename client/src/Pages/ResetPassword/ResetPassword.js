import React from 'react';
import './ResetPassword.css';
import { Row, Button, Input, Form, Alert, Icon } from 'antd';
import axios from '../../Utils/axios';
import { withRouter } from "react-router";
import i18next from 'i18next';
import { compareToFirstPassword } from '../../Shared/Validators/validators';
import { MAX_LENGTH, MIN_LENGTH } from '../../Utils/constants';
import { Link } from "react-router-dom";
import logo from '../../icons/logo1.svg';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: true,
      resendSuccessfullySent: false,
      resendFailed: false
    };

    this.onReturnButtonClick = this.onReturnButtonClick.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const queryParams= window.location.search;
        const params = new URLSearchParams(queryParams); 

        axios.post('/user/reset-password', {data:{
          token: decodeURIComponent(params.get('token')),
          email: decodeURIComponent(params.get('email')),
          password: values.password
        }}).then(() =>{
          this.setState({resendSuccessfullySent: true, resendFailed: false});
          this.props.form.resetFields();
        }, () =>{
          this.setState({resendFailed: true});
        });
      }
    });
  };

  componentDidMount(){
    const queryParams= window.location.search;
    const params = new URLSearchParams(queryParams); 
    if(!params.get('email') && !params.get('token')){
      this.props.history.push('/');
      return;
    }
  }

  onReturnButtonClick(){
    this.props.history.push('/');
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="reset-password-container default-background">
        <div className="reset-password-form-container">
          <Row style={{marginBottom: '20px'}} justify="center" type="flex">
              <Link to="/">
                <Icon component={logo} style={{fontSize: '80px'}} />            
              </Link>
          </Row>
          <Row justify="center" type="flex">
            <h1>
              { i18next.t('reset-password') }
            </h1>          
          </Row>
          <Row>
            { this.state.resendFailed ? <Alert message={i18next.t('reset-password-failed-paragraph')} type="error" /> : null}
          </Row>   
          <Row>
            { this.state.resendSuccessfullySent ? <Alert message={i18next.t('reset-password-success-message')} type="success" /> : null}
          </Row>         
          <Form onSubmit={this.handleSubmit} style={{width: '100%'}}>
            <Form.Item label={i18next.t('new-password')}>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: i18next.t('error-message-required-new-password') },
                  { max: MAX_LENGTH.password, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.password})},
                  { min: MIN_LENGTH.password, message: i18next.t('error-message-min-character', {min: MIN_LENGTH.password})}
                ]
              })(
                <Input.Password rows={6} size="large"/>,
              )}
            </Form.Item>
            <Form.Item label={i18next.t('confirm-password')}>
              {getFieldDecorator('password2', {
                rules: [
                  { required: true, message: i18next.t('error-message-required-new-password-again') },
                  { validator: compareToFirstPassword(this.props.form) },
                  {max: MAX_LENGTH.password, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.password})}
                ]
              })(
                <Input.Password rows={6} size="large"/>,
              )}
            </Form.Item>

            <Row>
              {
                this.state.resendSuccessfullySent ? (
                  <div>
                    <Button onClick={this.onReturnButtonClick} type="primary" size="large" block={true}>
                      { i18next.t('return-to-front-page') }
                    </Button>
                  </div>
                ) : 
                (
                  <Button className="forgot-password-verify-button" htmlType="submit"  size="large" block={true}>
                    { i18next.t('reset-password') }
                  </Button>    
                )
              }
            </Row>    
          </Form>  
        </div>      
      </div>
    );
  }
}

export default Form.create({ name: 'reset-password' })(withRouter(ResetPassword));
