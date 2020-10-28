import React from 'react';
import './EmployerTransactions.css';
import { Table } from 'antd';
//import { Affix, Button, Menu, Icon } from 'antd';
import axios from '../../../Utils/axios';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import { DATE_FORMAT } from '../../../Utils/constants';

class EmployerTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  columns = [
    {
      title: this.props.t('package-id'),
      dataIndex: 'packageId',
      sorter: (a, b) => a.packageId.length - b.packageId.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: this.props.t('title'),
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: this.props.t('payment-date'),
      dataIndex: 'paymentDate',
      defaultSortOrder: ['descend', 'ascend'],
      sorter: (a, b) => new Date(a.paymentDate).getTime() - new Date(b.paymentDate).getTime(),
      render: (date) => {
        return(
          <span>
            {moment(date).format(DATE_FORMAT)}
          </span>
        )
      }
    },
    /*{
      title: this.props.t('status'),
      dataIndex: 'status',
      filters: [
        {
          text: 'Active',
          value: 'Active',
        },
        {
          text: 'Inactive',
          value: 'Inactive',
        },
        {
          text: 'Draft',
          value: 'Draft',
        }
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: this.props.t('actions'),
      render: (text, record, index) => 
        <Row>
          <Tooltip placement="top" title={this.props.t('view')}>
            <Button type="link">
              <Icon type="eye" />
            </Button>           
          </Tooltip>       
        </Row>
    }*/
  ];
  
  componentDidMount(){
    axios.get('/payment/transactions').then(res =>{
      this.setState({data: res.data})
    })
  }
  
  render() {
    return (
      <div className="employer-transactions-page">
        <Table columns={this.columns} dataSource={this.state.data} onChange={this.onChange}/>      
      </div>
    );
  }
}

export default withTranslation()(EmployerTransactions);
