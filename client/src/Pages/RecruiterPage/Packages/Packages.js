import React from 'react';
import './Packages.css';
import { Table, Tooltip, Button, Icon, Row } from 'antd';
//import { Affix, Button, Menu, Icon } from 'antd';
import moment from 'moment';
import axios from '../../../Utils/axios';
import receipt from '../../../icons/receipt.svg';
import i18next from 'i18next';


const fileDownload = require('js-file-download');

class Packages extends React.Component {
  columns = [
    {
      title: i18next.t('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      render: (data) => {
        return (
          <div key={data._id}>
            <div>
              <span style={{fontWeight: 'bold'}}>
                {i18next.t('name')+': '} 
              </span>
              {i18next.t(data.name)}
            </div>
            <div>
              <span style={{fontWeight: 'bold'}}>
                {i18next.t('type')+': '} 
              </span>
              {this.getType(data.amount)} 
            </div>
            { data.amount > 1 ? 
              <div>
                <div>
                  <span style={{fontWeight: 'bold'}}>
                    {i18next.t('remaining')+': '} 
                  </span>
                  {data.remaining}/{data.amount}
                </div> 
                <div>
                  <span style={{fontWeight: 'bold'}}>
                    {i18next.t('package-id')+': '} 
                  </span>
                  {data._id}
                </div> 
              </div>
              : 
              null 
            }      
          </div>
        )
      }
    },
    {
      title: i18next.t('payment-date'),
      dataIndex: 'created',
      defaultSortOrder: ['descend', 'ascend'],
      sorter: (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime(),
      render: (data) => {
        const date = moment(new Date(data)).format('DD.MM.YYYY hh:mm:ss');
        return (
          <div key={data._id}>
            {date}
          </div>
        )
      }
    },
    {
      title: i18next.t('actions'),
      render: (data) => 
        <Row key={data._id}>  
          <Tooltip placement="top" title={i18next.t('receipt')}>
            {data.name === 'free' ? null : <Button onClick={() => this.onDownloadReceipt(data._id)} type="link">
              <Icon component={receipt} />
            </Button>
            }
          </Tooltip>     
        </Row>
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }

    this.getType = this.getType.bind(this);
  }
  
  getType(amount){
    if(amount > 1){
      return i18next.t('package');
    }

    if(amount ===1){
      return i18next.t('single-post');
    }

    return i18next.t('additional-features');
  }

  componentDidMount(){
    axios.get('/payment/packages').then(res =>{
      this.setState({data: res.data})
    });
  }

  onDownloadReceipt(packageId){
    axios.get('/payment/receipt/'+packageId, {responseType: 'blob'}).then((res) =>{
      fileDownload(res.data, 'receipt.pdf');
    });
  }

  render() {
    return (
      <Table columns={this.columns} dataSource={this.state.data} onChange={this.onChange} rowKey='_id'/>
    );
  }

}

export default Packages;
