import React from 'react';
import './SignUpModal.css';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  notification,
  DatePicker
} from 'antd';
import SearchLocation from '../../Form-Items/SearchLocation/SearchLocation';
import axios from '../../../Utils/axios';
import moment from 'moment';
import {compareToFirstPassword, urlValidator, userExists, validatePhoneNumber} from '../../Validators/validators';
import { getCompanySizeOptions } from '../../../Utils/codeset';
import { MAX_LENGTH, DATE_FORMAT, MIN_LENGTH } from '../../../Utils/constants';
import i18next from 'i18next';
import ReCaptchaFormItem from '../../ReCaptcha/ReCaptchaFormItem';
import { SignUpContext } from './SignUpContext';

const { Option } = Select;

class SignUpRecruiterForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      autoCompleteResult: [],
      companySizeOptions: [],
      loading: false
    };
  }

  componentDidMount() {
    getCompanySizeOptions()
    .then((options) => {
      this.setState({companySizeOptions: options});
    });
  }

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
        // TODO register 
        const data = {
          ...values,
          establishingYear: values.establishingYear.toDate(),
          birthday: values.birthday.toDate()
        }
        delete data.confirm; 

        this.setState({loading: true});
        axios.post('/user/register/employer',data).then(res => {
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

  render() {
    const { getFieldDecorator } = this.props.form;
  
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 0,
        },
        md: {
          span: 24,
          offset: 0,
        },
        xl: {
          span: 24,
          offset: 0,
        },
      },
    };
    
    return (
      <SignUpContext.Consumer>
      {({visible, toggle}) => (
        <Form onSubmit={e => {this.handleSubmit(e,toggle)}}>
        <Row>
          <Col span={12} style={{padding: ' 0 4px 0 0'}}>
            <Form.Item label={i18next.t('first-name')}>
              {getFieldDecorator('firstname', {
                rules: [
                  { required: true, message: i18next.t('error-message-required-first-name') },
                  { max: MAX_LENGTH.name, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.name})}
                ]
              })(<Input size="large"/>)}            
            </Form.Item>  
          </Col>
          <Col span={12} style={{padding: ' 0 0 0 4px'}}>
            <Form.Item label={i18next.t('last-name')}>
              {getFieldDecorator('lastname', {
                rules: [
                  { required: true, message: i18next.t('error-message-required-last-name') },
                  { max: MAX_LENGTH.name, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.name})}
                  ]
              })(<Input size="large"/>)}
            </Form.Item> 
          </Col>        
        </Row>
        <Row>
          <Form.Item label={i18next.t('birthday')}>
              {getFieldDecorator('birthday', {
                rules: [
                  { required: true, message: i18next.t('error-message-required-birthday') },
                ]
              })(<DatePicker size="large" style={{width: '100%'}} format={DATE_FORMAT} defaultPickerValue={moment().subtract(18,'year')} disabledDate={d => d.isAfter(moment().subtract(18,'year'))}/>)}
            </Form.Item>          
        </Row>
        <Row>
          <Col span={12} style={{padding: ' 0 4px 0 0'}}>
            <Form.Item label={i18next.t('email')}>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: i18next.t('error-message-required-email') },
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {validator: userExists},
                  {max: MAX_LENGTH.email, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.email})}
                ]
              })(<Input size="large"/>)}
            </Form.Item>
          </Col>
          <Col span={12} style={{padding: ' 0 0 0 4px'}}>
            <Form.Item label={i18next.t('phone-number')}>
              {getFieldDecorator('number', {
                  rules: [
                  { required: true, message: i18next.t('error-message-required-phone-number') },
                  { max: MAX_LENGTH.phoneNumber, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.phoneNumber})},
                  { validator: validatePhoneNumber}
                ]
              })(<Input size="large" placeholder={i18next.t('phone-number-placeholder')} style={{ width: '100%' }} />)}
            </Form.Item>
          </Col>        
        </Row>  
        <Row>
          <Col span={12} style={{padding: ' 0 4px 0 0'}}>
            <Form.Item label={i18next.t('company-name')}>
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: i18next.t('error-message-required-company-name') },
                  { max: MAX_LENGTH.companyName, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.companyName})}
                ]
              })(<Input size="large"/>)}   
            </Form.Item>
          </Col>
          <Col span={12} style={{padding: ' 0 0 0 4px'}}>
            <Form.Item label={i18next.t('company-size')}>
              {getFieldDecorator('companySize', {
                  rules: [
                    { required: true, message: i18next.t('error-message-required-company-size') }
                  ]
                })(
                  <Select allowClear={true} size="large">
                  {this.state.companySizeOptions.map( (value, index) => {
                    return(<Option key={index} value={value.value}>{value.label}</Option>)
                  })}
                </Select>
              )}   
            </Form.Item>
          </Col>        
        </Row>      
        <Row>
          <Col span={12} style={{padding: ' 0 4px 0 0'}}>
            <Form.Item label={i18next.t('founded')}>    
              {getFieldDecorator('establishingYear', {
                rules: [
                  { required: true, message: i18next.t('error-message-required-founded') }
                ]
              })(
                <DatePicker size="large" style={{width: '100%'}} format={DATE_FORMAT} disabledDate={d => d.isSameOrAfter(moment())}/>
              )}     
            </Form.Item> 
          </Col>
          <Col span={12} style={{padding: ' 0 0 0 4px'}}>
            <Form.Item  label={i18next.t('address')}>
              {getFieldDecorator('address', {
                rules: [
                  { required: true, message: i18next.t('error-message-required-address') },
                  { max: MAX_LENGTH.address, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.address})}
                ]
              })(<Input size="large"/>)}                
            </Form.Item>       
          </Col>        
        </Row>          
        <Form.Item  label={i18next.t('city')}>
          {getFieldDecorator('location', {
            rules: [{ required: true, message: i18next.t('error-message-required-location') }],
          })(<SearchLocation size="large" option="city"/>)}                
        </Form.Item> 
        <Form.Item label={i18next.t('website')}>
          {getFieldDecorator('homePageUrl', {
            rules: [
              {max: MAX_LENGTH.url, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.url})},
              {validator: urlValidator}
            ]
          })(
            <Input size="large"/>,
          )}
        </Form.Item>
        <Form.Item label={i18next.t('company-id')} >
          {getFieldDecorator('companyId', {
            rules: [
              { required: true, message: i18next.t('error-message-required-company-id') },
              { max: MAX_LENGTH.employer.companyId, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.employer.companyId})}
            ]
          })(<Input size="large"/>)}                
        </Form.Item>        
        <Form.Item label={i18next.t('password')} >
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: i18next.t('error-message-required-password') },
              { max: MAX_LENGTH.password, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.password})},
              { min: MIN_LENGTH.password, message: i18next.t('error-message-min-character', {min: MIN_LENGTH.password})}
            ]
          })(<Input.Password  size="large"/>)}
        </Form.Item>
        <Form.Item label={i18next.t('confirm-password')} >
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: i18next.t('error-message-required-password') },
              { validator: compareToFirstPassword(this.props.form) },
              {max: MAX_LENGTH.password, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.password})}
            ]
          })(<Input.Password  size="large" onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('g-recaptcha-response', {
            rules: [
              { required: true, message: i18next.t('error-message-required-recaptcha') }
            ]
          })(<ReCaptchaFormItem/>)}
        </Form.Item>    
        <Form.Item {...tailFormItemLayout}>
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
const WrappedSignUpRecruiterForm = Form.create({ name: 'register_recruiter' })(SignUpRecruiterForm);
export default WrappedSignUpRecruiterForm;