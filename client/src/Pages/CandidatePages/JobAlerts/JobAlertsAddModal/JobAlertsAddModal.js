import React from 'react';
import { Form, Button, Select, Modal, Input, notification} from 'antd';
import axios from '../../../../Utils/axios';
import SearchLocation from '../../../../Shared/Form-Items/SearchLocation/SearchLocation';
import i18next from 'i18next';
import { getEmailFrequencyOptions } from '../../../../Utils/codeset';
import { MAX_LENGTH } from '../../../../Utils/constants';

const { Option } = Select;

class JobAlertsAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      jobTypeOptions: [],
      emailFrequencyOptions: [],
      jobOptions: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  componentDidMount() {
    getEmailFrequencyOptions().then(options => {
      this.setState({emailFrequencyOptions: options});
    });
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/job-alert', values).then( res => {
          notification['success']({
            message: i18next.t('alert-page-candidate-add-success-message'),
            duration: 5,
            description:
              ''
          });
          this.props.getAlerts();
          this.props.form.resetFields();
          this.setState({data: res.data, visible: false});
        });
      } 
    });
  };

  addAlert(){

  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button onClick={this.showModal} style={{marginBottom: '10px'}}>
          {i18next.t('alert-page-candidate-add-alert-modal-button')}
        </Button>             
        <Modal
        title={i18next.t('alert-page-candidate-add-alert-modal-button')}
        visible={this.state.visible}
        onOk={this.handleSubmit}
        onCancel={() => {
          this.setState({visible:false});
          this.props.form.resetFields();
        }}
        >
          <Form onSubmit={this.handleSubmit}>     
            <Form.Item label={i18next.t('alert-page-candidate-search-word')}>
              {getFieldDecorator('searchWord', {
                rules: [
                  { required: true, message: i18next.t('error-message-required') },
                  {max: MAX_LENGTH.employee.searchWord, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.employee.searchWord})}
                ],
              })(
                <Input size="large"/>
              )}
            </Form.Item>
            <Form.Item label={i18next.t('location')}>
              {getFieldDecorator('location', {
                rules: [{ required: true, message: i18next.t('error-message-required-location') }],
              })(
                <SearchLocation size="large"/>
              )}
            </Form.Item>             
            <Form.Item label={i18next.t('email-frequency')}>
              {getFieldDecorator('emailFrequency', {
                rules: [
                  { required: true, message: i18next.t('error-message-required') }
                ]
              })(
                <Select allowClear={true} size="large">
                {this.state.emailFrequencyOptions.map( (value, index) => {
                  return(<Option key={index} value={value.value}>{value.label}</Option>)
                })}
              </Select>
              )}
            </Form.Item>
          </Form>      
        </Modal>
      </div>
    );
  }
}

const WrappedJobAlertsAddModal = Form.create({ name: 'add_job_alert' })(JobAlertsAddModal);
export default WrappedJobAlertsAddModal;