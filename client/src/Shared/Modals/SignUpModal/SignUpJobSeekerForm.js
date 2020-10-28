import React from 'react';
import './SignUpModal.css';
import {
  Form,
  Input,
  Checkbox,
  Button,
  Col,
  Row,
  notification,
  DatePicker
} from 'antd';
import SearchLocation from '../../Form-Items/SearchLocation/SearchLocation';
import axios from '../../../Utils/axios';
import {compareToFirstPassword, userExists, validatePhoneNumber} from '../../Validators/validators';
import i18next from 'i18next';
import { MAX_LENGTH, DATE_FORMAT, MIN_LENGTH } from '../../../Utils/constants';
import ReCaptchaFormItem from '../../ReCaptcha/ReCaptchaFormItem';
import moment from 'moment';
import { SignUpContext } from './SignUpContext';

class SignUpJobSeekerForm extends React.Component {
  state = {
    autoCompleteResult: [],
    loading: false
  };
  

  openNotification = () => {
    notification['success']({
      message: i18next.t('sign-up-success-title'),
      duration: 5,
      description: i18next.t('sign-up-success-paragraph')
    });
  };

  handleSubmit = (e, toggle) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data= {
          ...values
        }

        delete data.confirm;
        delete data.checked;

        this.setState({loading: true});
        axios.post('/user/register/employee', data).then(()=>{
          this.setState({loading: false});
          this.openNotification();
          this.props.form.resetFields();
          toggle();                  
        }, () =>{
          this.setState({loading: false});
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <SignUpContext.Consumer>
      {({visible, toggle}) => (
        <Form onSubmit={e => {this.handleSubmit(e,toggle)}}>
          <Form.Item label={i18next.t('first-name')} >
                  {getFieldDecorator('userProfile.firstname', {
                    rules: [
                      { required: true, message: i18next.t('error-message-required-first-name') },
                      { max: MAX_LENGTH.name, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.name})}
                    ],
                  })(    
                  <Input size="large"/>
                  )}        
  
          </Form.Item>      
          <Form.Item label={i18next.t('last-name')} >
                  {getFieldDecorator('userProfile.lastname', {
                    rules: [
                      { required: true, message: i18next.t('error-message-required-last-name') },
                      { max: MAX_LENGTH.name, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.name})}
                    ]
                  })(    
                    <Input size="large"/>
                    )}                  
          </Form.Item>            
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
            <Form.Item label={i18next.t('birthday')}>
                {getFieldDecorator('userProfile.birthday', {
                  rules: [
                    { required: true, message: i18next.t('error-message-required-birthday') },
                  ]
                })(<DatePicker size="large" style={{width: '100%'}} format={DATE_FORMAT} defaultPickerValue={moment().subtract(18,'year')} disabledDate={d => d.isAfter(moment().subtract(18,'year'))}/>)}
              </Form.Item>     
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label={i18next.t('email')}>
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: i18next.t('error-message-required-email') },
                    {
                      type: 'email',
                      message: i18next.t('error-message-invalid-email'),
                    },
                    {validator: userExists},
                    { max: MAX_LENGTH.email, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.email})}
                  ]
                })(<Input size="large"/>)}
              </Form.Item>   
            </Col>        
          </Row>
          <Form.Item label={i18next.t('phone-number')}>
            {getFieldDecorator('userProfile.number', {
              rules: [
                { max: MAX_LENGTH.phoneNumber, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.phoneNumber})},
                { required: true, message: i18next.t('error-message-required-phone-number') },
                { validator: validatePhoneNumber}
              ]
            })(<Input size="large" placeholder={i18next.t('phone-number-placeholder')} style={{ width: '100%' }} />)}
          </Form.Item>    
          <Form.Item  label={i18next.t('address')} >
            {getFieldDecorator('userProfile.address', {
              rules: [
                { required: true, message: i18next.t('error-message-required-address') },
                { max: MAX_LENGTH.address, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.address})}
              ]
            })(<Input size="large"/>)}                
          </Form.Item>    
          <Form.Item  label={i18next.t('city')}>
            {getFieldDecorator('userProfile.location', {
              rules: [{ required: true, message: i18next.t('error-message-required-location') }]
            })(<SearchLocation size="large" option="city" />)}                
          </Form.Item>                   
          <Form.Item label={i18next.t('password')} hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: i18next.t('error-message-required-password') },
                { max: MAX_LENGTH.password, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.password})},
                { min: MIN_LENGTH.password, message: i18next.t('error-message-min-character', {min: MIN_LENGTH.password})}
              ]
            })(<Input.Password size="large"/>)}
          </Form.Item>      
          <Form.Item label={i18next.t('confirm-password')} hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                { required: true, message: i18next.t('error-message-required-new-password-again') },
                { validator: compareToFirstPassword(this.props.form) },
                {max: MAX_LENGTH.password, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.password})}
              ]
            })(<Input.Password size="large" onBlur={this.handleConfirmBlur} />)}
          </Form.Item>   
          <Form.Item>
            {getFieldDecorator('g-recaptcha-response', {
              rules: [
                { required: true, message: i18next.t('error-message-required-recaptcha') }
              ]
            })(<ReCaptchaFormItem/>)}
          </Form.Item>            
          <Form.Item>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
              rules: [
                { required: true, message: i18next.t('error-message-required-terms') }
              ]            
            })(
              <Checkbox>
                {i18next.t('i-have-read-the')} <a href="/terms-of-use" rel="noopener noreferrer" target="_blank">{i18next.t('terms')}</a>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item >
            <Button loading={this.state.loading} size="large" style={{marginRight:'0px', marginLeft: 'auto', display:'block'}} type="primary" htmlType="submit">
              {i18next.t('register')}
            </Button>
          </Form.Item>  
        </Form>
      )}
      </SignUpContext.Consumer>

    );
  }
}
const WrappedSignUpRegisterJobSeekerForm = Form.create({ name: 'register_job_seeker' })(SignUpJobSeekerForm);
export default WrappedSignUpRegisterJobSeekerForm;
