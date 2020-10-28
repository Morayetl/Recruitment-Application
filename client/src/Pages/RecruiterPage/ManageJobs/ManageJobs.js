import React from 'react';
import './ManageJobs.css';
import { Table, Tooltip, Button, Icon, Col, Row, Input, Modal } from 'antd';
import ManageJobsEdit from './ManageJobsEdit/ManageJobsEdit';
import ManageJobsDelete from './ManageJobsDelete/ManageJobsDelete';
import axios from '../../../Utils/axios';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import moment from 'moment';
import { DATE_FORMAT } from '../../../Utils/constants';

let timer = null;

class ManageJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      data: [],
      search_query : '',
      showEditModal: false,
      editModalTitle: ''
    }
    this.getJobs = this.getJobs.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount(){
    this.getJobs();
  }

  getJobs(query = null){
    const q = query ? encodeURIComponent(query): this.state.search_query;
    axios.get('/jobs/employer?query='+q).then(res =>{
      this.setState({data: res.data})
    });
  }

  columns = [
    {
      title: this.props.t('title'),
      dataIndex: 'title',
      sorter: (a, b) => a.title > b.title,
      sortDirections: ['descend', 'ascend'],
      render: (title,record) => {
        const startDate = moment(record.startDate).format(DATE_FORMAT);
        const endDate = moment(record.endDate).format(DATE_FORMAT);
        const applicationProcessEndDate = record.applicationProcessExpiringDate ? moment(record.applicationProcessExpiringDate).format(DATE_FORMAT) : null;

        return (
          <Row>
            <div>
              {`${i18next.t('title')}: ${title}`}
            </div>
            <div>
              {`${i18next.t('job-id')}: ${record._id}`}
            </div>
            <div>
              {`${i18next.t('from')}: ${startDate}`}
            </div>
            <div>
              {`${i18next.t('to')}: ${endDate}`}
            </div>
            {
              applicationProcessEndDate ? 
              (
                <div>
                  {`${i18next.t('manage-jobs-application-process-end-date')}: ${applicationProcessEndDate}`}
                </div>
              ) : null
            }
          </Row>
        )
      }
    },
    {
      title: this.props.t('applications'),
      dataIndex: 'appliers',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.appliers - b.appliers
    },
    {
      title: this.props.t('status'),
      dataIndex: 'status',
      filters: [
        {
          text: i18next.t('active'),
          value: 'active',
        },
        {
          text: i18next.t('inactive'),
          value: 'inactive',
        },
        /*{
          text: 'Draft',
          value: 'draft',
        }*/
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend', 'ascend'],
      render: (status) => (
        <div>
          {i18next.t(status)}
        </div>
      )
    },
    {
      title: this.props.t('actions'),
      render: (data, record, index) => {
        // check if application processing time has expired
        const applicationExpired = data.applicationProcessExpiringDate ? moment(data.applicationProcessExpiringDate).isSameOrBefore(moment()) : false; 

        return(
          <Row type="flex">
            <Col>
              <Tooltip placement="top" title={data.appliers ? this.props.t('view-job-applications') : ''}>
                <Link to={'/applications/'+data._id} disabled>
                  <Button type="link" disabled={!data.appliers || applicationExpired}>
                    <Icon type="file-search" />
                  </Button>      
                </Link>     
              </Tooltip>
            </Col>
            <Col>
              <Tooltip placement="top" title={this.props.t('edit')}>
                <Button disabled={record.status === 'inactive'} onClick={() => this.onEditClick(data._id,data.title)} type="link">
                  <Icon type="edit" />
                </Button>               
              </Tooltip>
            </Col>
            <Col>
              <ManageJobsDelete data={data} updateJobList={this.getJobs}/>
            </Col> 
          </Row>          
        )
      }

    }
  ];

  onSearch(e){
    e.persist();
    if(timer) {
      clearTimeout(timer); 
    }
    const value = e.currentTarget.value;
    timer = setTimeout(() => { // return the timeoutID
      this.setState({search_query: value})
      this.getJobs(value);
      timer = null;    
    }, 300); 

  }

  onEditClick(jobId, title){
    axios.get('/jobs/job/' + jobId)
    .then((res) => {
      this.setState({
        editdata: res.data,
        showEditModal: true,
        editModalTitle: title
      });
    });
  }
  
  render() {
    return (
      <div>
        <Row style={{marginBottom: '20px'}}>
          <Input size="large" onChange={this.onSearch} placeholder={i18next.t('manage-jobs-search-placeholder')} />
        </Row>
        <Row>
          <Table columns={this.columns} dataSource={this.state.data} rowKey="_id"/>          
        </Row>
        <Modal
          title={ `${i18next.t('edit')} - ${this.state.editModalTitle}` }
          visible={ this.state.showEditModal }
          onCancel={ ()=>this.setState({showEditModal: false}) }
          width="900px"
          footer={null}
        >
          <ManageJobsEdit data={this.state.editdata} closeModal={()=>this.setState({showEditModal: false})} updateJobList={this.getJobs}/>
        </Modal>
      </div>
    );
  }
}

export default withTranslation()(withRouter(ManageJobs));
