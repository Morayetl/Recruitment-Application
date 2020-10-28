import React from 'react';
import { Form, Input, Button, Row, Alert, Popconfirm } from 'antd';
import axios from '../../../Utils/axios';
import { compareToFirstPassword } from '../../Validators/validators';
import { withTranslation } from 'react-i18next';
import { MAX_LENGTH, MIN_LENGTH } from '../../../Utils/constants';
import i18next from 'i18next';
import auth from '../../../Utils/auth';

class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordChanged: false,
      passwordChangeFail: false,
      passwordChangeSuccess: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ...values
        }    
        delete data.password2;
        axios.post('/user/change-password', data).then((res) => {
          this.setState({passwordChangeSuccess: true, passwordChangeFail: false});
          this.props.form.resetFields();
        }, ()=>{
          this.setState({passwordChangeFail: true})
        });
      } 
    });
  };

  async deleteAccount(){
    const res = await axios.delete('/user');
    if(res.status === 200){
      auth.logout();
      window.location = '/';
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Row>
          { this.state.passwordChangeSuccess ? <Alert message={i18next.t('change-password-success-message')} type="success" /> : null }
        </Row>
        <Row>
          { this.state.passwordChangeFail ? <Alert message={i18next.t('change-password-fail-message')} type="error" /> : null }
        </Row>
        <Form onSubmit={this.handleSubmit}>     
          <Form.Item label={this.props.t('password')}>
            {getFieldDecorator('currentPassword', {
              rules: [{ required: true, message: this.props.t('error-message-required-password') }],
            })(
              <Input.Password size="large"/>,
            )}
          </Form.Item>
          <Form.Item label={this.props.t('new-password')}>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: this.props.t('error-message-required-new-password') },
                { max: MAX_LENGTH.password, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.password})},
                { min: MIN_LENGTH.password, message: i18next.t('error-message-min-character', {min: MIN_LENGTH.password})}
              ]
            })(
              <Input.Password rows={6} size="large"/>,
            )}
          </Form.Item>
          <Form.Item label={this.props.t('confirm-password')}>
            {getFieldDecorator('password2', {
              rules: [
                { required: true, message: this.props.t('error-message-required-new-password-again') },
                { validator: compareToFirstPassword(this.props.form) },
                {max: MAX_LENGTH.password, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.password})}
              ]
            })(
              <Input.Password rows={6} size="large"/>,
            )}
          </Form.Item>
          <Form.Item >
            <Button size="large" style={{marginRight:'0px', marginLeft: 'auto', display:'block'}} type="primary" htmlType="submit">
              {this.props.t('update')}
            </Button>
          </Form.Item>            
        </Form>      
        <Row type="flex" justify="end">
          <Popconfirm
            title={i18next.t('change-password-delete-account-confimation')}
            onConfirm={this.deleteAccount}
            okText={i18next.t('yes')}
            cancelText={i18next.t('no')}
          >
            <Button type="link" style={{color: 'red'}}>
              {i18next.t('change-password-delete-account')}
            </Button>
          </Popconfirm>
        </Row>
      </div>
    );
  }
}

const WrappedChangePasswordForm = withTranslation()(Form.create({ name: 'change_password' })(ChangePasswordForm));
export default WrappedChangePasswordForm;
