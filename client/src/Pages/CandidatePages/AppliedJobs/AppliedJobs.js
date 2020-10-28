import React from 'react';
import './AppliedJobs.css';
import { Table, Tooltip, Button, Icon, Row, Modal, Popconfirm, notification } from 'antd';
import axios from '../../../Utils/axios';
import i18next from 'i18next';
import moment from 'moment';
import { DATE_FORMAT } from '../../../Utils/constants';

const { confirm } = Modal;

class AppliedJobs extends React.Component {
  columns = [
    {
      title: i18next.t('position'),
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: i18next.t('location'),
      dataIndex: 'location',
      sorter: (a, b) => a.location.length - b.location.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: i18next.t('date'),
      dataIndex: 'created',
      defaultSortOrder: ['descend', 'ascend'],
      sorter: (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime(),
      render: (created) =>{
        const date = moment(created).format(DATE_FORMAT);
        return(
          <div>
            {date}
          </div>
        )
      }
    },
    {
      title: i18next.t('actions'),
      render: (text, record, index) => 
        <Row>
            <Popconfirm
              title={i18next.t('applied-job-delete-confimation-message')}
              onConfirm={() => this.deleteApplication(text._id)}
              okText={i18next.t('yes')}
              cancelText={i18next.t('no')}
            >
            <Button type="link">
              <Icon type="delete" />
            </Button>
          </Popconfirm>       
        </Row>
    }
  ];
  
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    this.getApplications = this.getApplications.bind(this);
    this.deleteApplication = this.deleteApplication.bind(this);
  }

  componentDidMount(){
    this.getApplications();
  }

  getApplications(){
    axios.get('/jobs/employee').then(res => {
      this.setState({data: res.data});
    });    
  }
  
  /**
   * Deletes applied job
   * @param {*} id id of the application
   */
  deleteApplication(id){
    axios.delete('/jobs/employee/'+id).then(res=>{
      notification['success']({
        message: i18next.t('applied-job-delete-success-message'),
        duration: 5,
        description:
          ''
      });
      this.getApplications();
    });
  }
  
  showDeleteConfirm(title, id, parent) {
    confirm({
      title: 'Are you sure delete this job application?',
      content: 'Recruiters wont see your application, if you delete it.',
      okText: i18next.t('yes'),
      okType: 'danger',
      cancelText: i18next.t('no'),
      onOk() {
        axios.delete('/jobs/employee/'+id).then(res=>{
          parent.getApplications();
        });
      },
      onCancel() {},
    });
  } 
  
  render() {
    return (
      <Table columns={this.columns} dataSource={this.state.data} onChange={this.onChange} rowKey="_id"/>
    );
  }
}

export default AppliedJobs;
