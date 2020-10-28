import React from 'react';
import { Form, Button, Select, Modal} from 'antd';
import axios from '../../../../Utils/axios';
import { withTranslation } from 'react-i18next';

const { Option } = Select;

class JobApplicationAlertsAddModal extends React.Component {
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
    /* implement api that gets employers active jobs
    axios.get('/codeset',{params: {type: 'jobType'}})
    .then((res) => {
      const options = res.data.map(value => {
        return { 
          value: value.value,
          label: value.en
        }
      });
      this.setState({jobTypeOptions: options});
    });*/
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ...values
        }
        axios.post('/jobs/job', data);
      } 
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button onClick={this.showModal} style={{marginBottom: '10px'}}>
          {this.props.t('job-application-modal-alert-button')}
        </Button>             
        <Modal
        title={this.props.t('job-application-modal-alert-title')}
        visible={this.state.visible}
        onOk={this.handleSubmit}
        onCancel={() => this.setState({visible:false})}
        >
          <Form onSubmit={this.handleSubmit}>     
            <Form.Item label={this.props.t('job')}>
              {getFieldDecorator('job', {
                rules: [{ required: true, message: 'Please select job!' }],
              })(
                <Select allowClear={true} size="large">
                {this.state.jobOptions.map( (value, index) => {
                  return(<Option key={index} value={value.value}>{value.label}</Option>)
                })}
              </Select>
              )}
            </Form.Item>
            <Form.Item label={this.props.t('email-frequency')}>
              {getFieldDecorator('emailFrequency', {
                rules: [
                  { required: true, message: 'Please insert email frequency!' }
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

const JobApplicationAlertsAddModalModal = withTranslation()(Form.create({ name: 'add_job_alert' })(JobApplicationAlertsAddModal));
export default JobApplicationAlertsAddModalModal;