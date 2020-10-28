import React from 'react';
import './JobAlerts.css';
import { Table, Button, Icon, Row, Select, Col, Popconfirm, notification } from 'antd';
import JobAlertsAddModal from './JobAlertsAddModal/JobAlertsAddModal';
import { getEmailFrequencyOptions } from '../../../Utils/codeset';
import i18next from 'i18next';
import axios from '../../../Utils/axios';
import { MAX_LENGTH } from '../../../Utils/constants';

const { Option } = Select;

class JobAlerts extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      emailFrequencyOptions : []
    }
    this.getAlerts = this.getAlerts.bind(this);
    this.deleteAlert = this.deleteAlert.bind(this);
    this.onEmailFrequencyChange = this.onEmailFrequencyChange.bind(this);
  }

  componentDidMount(){
    getEmailFrequencyOptions().then(options => {
      this.setState({emailFrequencyOptions: options});
    });
    this.getAlerts();
  }

  getAlerts(){
    axios.get('/job-alert').then( res => {
      this.setState({data: res.data});
    });
  }

  deleteAlert(id){
    axios.delete('/job-alert/'+id).then( res => {
      this.getAlerts();
      notification['success']({
        message: i18next.t('alert-page-candidate-delete-success-message'),
        duration: 5,
        description:
          ''
      });
    });
  }

  columns = [
    {
      title: i18next.t('alert-page-candidate-alert-details'),
      dataIndex: 'searchWord',
      sorter: (a, b) => a.searchWord > b.searchWord,
      sortDirections: ['descend', 'ascend'],
      render: (text, record, index) =>
      <Row>
        <Row>
          <span>
            {record.searchWord}
          </span>
        </Row> 
        <Row>
          {record.location}
        </Row> 
      </Row> 
    },
    {
      title: i18next.t('email-frequency'),
      dataIndex: 'emailFrequency',
      width: '40%',
      render: (data, record, index) => 
        <Row>
          <Col span={15}>            
            <Select style={{width: '100%'}} allowClear={false} size="large" value={data} onChange={(value) => this.onEmailFrequencyChange(value, record._id)}>
              {this.state.emailFrequencyOptions.map( (value, index) => {
                return(<Option key={index} value={value.value}>{value.label}</Option>)
              })}
            </Select>
          </Col>
          <Col span={4}>
            <Popconfirm
              title={i18next.t('alert-page-candidate-delete-confimation-message')}
              onConfirm={() => this.deleteAlert(record._id)}
              okText={i18next.t('yes')}
              cancelText={i18next.t('cancel')}
            >
              <Button type="link">
                <Icon type="delete" />
              </Button>             
            </Popconfirm>
          </Col>
        </Row>
    }
  ];

  async onEmailFrequencyChange(value, id){
    await axios.put('/job-alert/' + id, {emailFrequency: value}).then(()=>{
      notification['success']({
        message: i18next.t('alert-page-candidate-update-success-message'),
        duration: 5,
        description:
          ''
      });
    });
    this.getAlerts();
  }
  
  render() {
    return (
      <div>
        <Row type="flex" justify="end">
          { this.state.data && this.state.data.length >= MAX_LENGTH.employee.jobAlerts ?
              null 
              :
              <JobAlertsAddModal getAlerts={this.getAlerts}/>
          }
        </Row>  
        <Row>
          <Table columns={this.columns} dataSource={this.state.data} onChange={this.onChange} rowKey="_id"/>
        </Row>        
      </div>
    );
  }
}

export default JobAlerts;
