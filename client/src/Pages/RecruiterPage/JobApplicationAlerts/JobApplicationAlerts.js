import React from 'react';
import './JobApplicationAlerts.css';
import { Table, Tooltip, Button, Icon, Row, Modal, Select, Col } from 'antd';
import JobApplicationAlertsAddModal from './JobApplicationAlertsAddModal/JobApplicationAlertsAddModal';
import { withTranslation } from 'react-i18next';
//import { Affix, Button, Menu, Icon } from 'antd';

const { confirm } = Modal;
const { Option } = Select;

class JobApplicationAlerts extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      jobOptions : [
        {
          value: 1,
          label: 'once a day'
        },
        {
          value: 2,
          label: 'two times a day'
        },
        {
          value: 3,
          label: 'once a week'
        }
      ]
    }
    console.log(this.state.jobOptions);
    this.getLabel = this.getLabel.bind(this);
  }

  getLabel(val){
    let value = this.state.jobOptions.find(o => o.value === val);
    return value.label;
  }

  columns = [
    {
      title: this.props.t('alert-name'),
      dataIndex: 'details',
      sorter: (a, b) => a.details.title.length - b.details.title.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, record, index) =>
      <Row>
        <Row>
          <span>
            {text.title}
          </span>
        </Row> 
        <Row>
          {text.address +' '+ text.location}
        </Row> 
      </Row> 
    },
    {
      title: this.props.t('email-frequency'),
      width: '40%',
      render: (text, record, index) => 
        <Row>
          <Col span={15}>            
            <Select style={{width: '100%'}} allowClear={false} size="large" defaultValue={this.getLabel(text.frequency)}>
              {this.state.jobOptions.map( (value, index) => {
                return(<Option key={index} value={value.value}>{value.label}</Option>)
              })}
            </Select>
          </Col>
          <Col span={4}>
            <Tooltip placement="top" title={'Delete'}>
              <Button onClick={() => this.showDeleteConfirm(text.details.title)} type="link">
                <Icon type="delete" />
              </Button>          
            </Tooltip> 
          </Col>
        </Row>
    }
  ];
  
  // Todo replace this with real data
  data = [
    {
      id: '873ysdbiksfkjnsd',
      key: '1',
      details: {
        title: 'job job',
        address: 'konttitie 2',
        location: 'SUomi, finland'
      },
      frequency: 1
    }
  ];

  showDeleteConfirm(title) {
    confirm({
      title: 'Are you sure delete this alert?',
      content: title,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
      },
      onCancel() {
      },
    });
  }  
  
  render() {
    return (
      <div>
        <Row type="flex" justify="end">
          <JobApplicationAlertsAddModal/>
        </Row>
        <Row>
          <Table columns={this.columns} dataSource={this.data} onChange={this.onChange}/>
        </Row>        
      </div>
    );
  }
}

export default withTranslation()(JobApplicationAlerts);
