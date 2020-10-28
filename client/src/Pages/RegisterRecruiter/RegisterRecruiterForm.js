import React from 'react';
import './RegisterRecruiter.css';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegisterRecruiterForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    firstNameError: '',
    lastNameError:'',
    companyNameError: '',
    companySizeError: '',
    companyIdError: '',
    companyAddressError: ''
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values, err);
      }
    });

    const { getFieldError} = this.props.form;
    const firstNameError = getFieldError('firstname');
    const lastNameError = getFieldError('lastname');
    const companyNameError = getFieldError('companyName');
    const companySizeError = getFieldError('companySize');
    const companyAddressError = getFieldError('companyAddress');
    const companyIdError = getFieldError('companyId');

    this.setState({    
      firstNameError: firstNameError,
      lastNameError: lastNameError,
      companyNameError: companyNameError,
      companySizeError: companySizeError,
      companyIdError: companyIdError,
      companyAddressError: companyAddressError
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
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
    const { autoCompleteResult } = this.state;
    const { firstNameError, lastNameError, companyNameError,companySizeError, companyIdError, companyAddressError} = this.state;
  
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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form className="register-recruiter-form" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={(firstNameError||lastNameError) ? 'error' : ''} help={firstNameError || lastNameError || ''}>
          <Row gutter={8}>
            <Col span={12}>
              <Row>
                <label className="ant-form-item-required">
                 Firstname: 
                </label>
              </Row>
              <Row>
                {getFieldDecorator('firstname', {
                  rules: [{ required: true, message: 'Please input your firstname!' }],
                })(<Input size="large"/>)}                
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <label className="ant-form-item-required">
                 Lastname: 
                </label>
              </Row>
              <Row>
                {getFieldDecorator('lastname', {
                  rules: [{ required: true, message: 'Please input your lastname' }],
                })(<Input size="large"/>)}                
              </Row>
            </Col>
          </Row>
        </Form.Item>      
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input size="large"/>)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input  size="large" addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item label="Website">
          {getFieldDecorator('website', {
            rules: [{ required: true, message: 'Please input website!' }],
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="website"
              size="large"
            >
              <Input/>
            </AutoComplete>,
          )}
        </Form.Item>
        <Form.Item validateStatus={(companySizeError||companyNameError) ? 'error' : ''} help={companyNameError || companySizeError || ''}>
          <Row gutter={8}>
            <Col span={12}>
              <Row>
                <label className="ant-form-item-required">
                 Company name: 
                </label>
              </Row>
              <Row>
                {getFieldDecorator('companyName', {
                  rules: [{ required: true, message: 'Please input name of your company!' }],
                })(<Input size="large"/>)}                
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <label className="ant-form-item-required">
                 Company size: 
                </label>
              </Row>
              <Row>
                {getFieldDecorator('companySize', {
                  rules: [{ required: true, message: 'Please input your company size!' }],
                })(
                <Select size="large">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              )}                
              </Row>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item validateStatus={(companyAddressError||companyIdError) ? 'error' : ''} help={companyAddressError || companyIdError || ''}>
          <Row gutter={8}>
            <Col span={12}>
              <Row>
                <label className="ant-form-item-required">
                 Company ID: 
                </label>
              </Row>
              <Row>
                {getFieldDecorator('companyAddress', {
                  rules: [{ required: true, message: 'Please input your companys address!' }],
                })(<Input size="large"/>)}                
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <label className="ant-form-item-required">
                 Company address: 
                </label>
              </Row>
              <Row>
                {getFieldDecorator('companyId', {
                  rules: [{ required: true, message: 'Please input your company id!' }],
                })(<Input size="large"/>)}                
              </Row>
            </Col>
          </Row>
        </Form.Item>        
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password  size="large"/>)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password  size="large" onBlur={this.handleConfirmBlur} />)}
        </Form.Item>   
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item> 
      </Form>
    );
  }
}
const WrappedRegisterRecruiterForm = Form.create({ name: 'register_recruiter' })(RegisterRecruiterForm);
export default WrappedRegisterRecruiterForm;
