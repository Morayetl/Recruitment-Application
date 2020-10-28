import React from 'react';
import { Form, Button, Modal, Input, Icon, Row, Alert} from 'antd';
import axios from '../../../Utils/axios';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import cookie from 'js-cookie';
import i18next from 'i18next';
import './LoginModal.css';
import { COOKIES, COOKIES_SECURE } from '../../../Utils/constants';
import logo from '../../../icons/logo1.svg';


class LoginModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false   // when user presses login it loads
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
      userNotVerified: false,
      loginFailed: false,
      tooManyTries: false
    });
  };

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ...values
        }
        this.setState({loading: true});
        axios.post('/login', data).then(res => {
          // if user isnt verified 
          if(!res.data.emailVerified){
            this.setState({userNotVerified: true});
            return;
          }
          cookie.set(COOKIES.authorization, `Bearer ${res.data.token}`, { path: '/', secure: COOKIES_SECURE, expires: res.data.exp, 'samesite': 'strict'});
          cookie.set(COOKIES.role, res.data.role, { path: '/', secure: COOKIES_SECURE, expires: res.data.exp, 'samesite': 'strict'}); 
          switch(res.data.role){
            case 'employer':
              this.props.history.push('/employer/company-profile');
              break;
            case 'employee':
              this.props.history.push('/user/profile');
              break;
            default:
          };
        }, (error)=> {
          if(error.response.status === 403) {
            this.setState({loginFailed: true, tooManyTries: false, userNotVerified: false});
          }else if(error.response.status === 429){
            this.setState({tooManyTries: true, loginFailed: false, userNotVerified: false});
          }

          this.setState({loading: false});
        });
      } 
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div className="login-modal-button" onClick={this.showModal}>
          { i18next.t('login') }
        </div>             
        <Modal
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={() => this.setState({visible:false})}
          footer= {null}
        >
   
          <Row justify="center" type="flex">
    
            <h1>
              <Icon component={logo} style={{marginRight: '5px'}}/>
              {i18next.t('login')}               
            </h1>
          </Row>
          
            { this.state.userNotVerified ? <Row style={{marginBottom: '10px'}}>
              <Alert message={i18next.t('login-error-user-not-verified')} type="error" /> 
            </Row> : null }
          
          
            { this.state.loginFailed ? <Row style={{marginBottom: '10px'}}>
              <Alert message={i18next.t('login-error-credentials-wrong')} type="error" />
            </Row> : null }
                
          
            { this.state.tooManyTries ? <Row style={{marginBottom: '10px'}}>
                <Alert message={i18next.t('login-error-too-many-logins')} type="error" /> 
              </Row> : null }
                
          <Form onSubmit={this.handleSubmit}>     
            <Form.Item label={i18next.t('email')}>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: i18next.t('error-message-required')} ],
              })(
                <Input size="large" suffix={
                  <Icon type="mail" />
                }/>
              )}
            </Form.Item>
            <Form.Item label={i18next.t('password')}>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: i18next.t('error-message-required-password') }
                ]
              })(<Input.Password size="large"/>
              )}
            </Form.Item>            
            <Form.Item >
              <Button size="large" style={{width:'100%'}} type="primary" htmlType="submit" loading={this.state.loading}>
                {i18next.t('login')}
              </Button>
            </Form.Item>      
          </Form>     
          <Row justify="center" type="flex">
                <Link to="/forgot-password">
                  {i18next.t('login-forgot-password')}
                </Link>
          </Row> 
        </Modal>
      </div>
    );
  }
}

const LoginModal = Form.create({ name: 'login_modal' })(LoginModalContainer);
export default  withRouter(LoginModal);