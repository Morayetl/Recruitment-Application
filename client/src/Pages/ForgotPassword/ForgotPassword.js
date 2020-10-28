import React from 'react';
import './ForgotPassword.css';
import { Row, Button, Input, Form, Icon } from 'antd';
import axios from '../../Utils/axios';
import { withRouter } from "react-router";
import i18next from 'i18next';
import logo from '../../icons/logo1.svg';
import { Link } from "react-router-dom";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: true,
      resendSent: false
    };

    this.onReturnButtonClick = this.onReturnButtonClick.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = new URLSearchParams([['email',values.email]]); 
        axios.post('/user/forgot-password?'+params.toString()).then(() =>{
          this.setState({resendSent: true});
        });
      }
    });
  };

  componentDidMount(){}

  onReturnButtonClick(){
    this.props.history.push('/');
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="forgot-password-container default-background">
        <div className="forgot-password-form-container">
          <Row style={{marginBottom: '20px'}} justify="center" type="flex">
            <Link to="/">
              <Icon component={logo} style={{fontSize: '80px'}} />            
            </Link>
          </Row>
          <div>
            <Row justify="center" type="flex">
              <h1>
                { i18next.t('forgot-password-title') }
              </h1>
            </Row>
            <Row justify="center" type="flex">
              <p className="forgot-password-paragraph">
                { i18next.t('forgot-password-paragraph') }
              </p>
            </Row>               
          </div>
          <div>
            <Row justify="center" type="flex">
              {
                this.state.resendSent ? (
                  <div>
                    <div>
                    <p className="confirm-email-paragraph" style={{color: 'black'}}>
                      <Icon style={{color: 'green', marginRight: '5px'}} type="check-circle" />
                      { i18next.t('forgot-password-resend-message') } 
                    </p>
                    </div>
                    <Button onClick={this.onReturnButtonClick} type="primary" size="large" block={true}>
                      { i18next.t('return-to-front-page') }
                    </Button>                        
                  </div>
                ) : 
                (
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
                      {
                        this.state.resendSent ? (
                          <Button onClick={this.onReturnButtonClick} type="primary" size="large" block={true}>
                            { i18next.t('return-to-front-page') }
                          </Button>
                        ) : 
                        (
                          <Button className="forgot-password-verify-button" htmlType="submit"  size="large" block={true}>
                            { i18next.t('forgot-password-button') }
                          </Button>    
                        )
                      }
                    </Row>    
                  </Form>  
                )
              }                
            </Row>
          </div>
        </div>      
      </div>
    );
  }
}

export default Form.create({ name: 'forgot-password' })(withRouter(ForgotPassword));
