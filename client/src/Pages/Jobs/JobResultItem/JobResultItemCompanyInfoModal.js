import React from 'react';
import './JobResultItem.css';
import { Row, Col, Button, Modal } from 'antd';
import axios from '../../../Utils/axios';



class JobResultItemCompanyInfoModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      visible:  false,
      data:     {}
    }
    this.showModal = this.showModal.bind(this);
  }

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });

    axios.get('/user/employer/' + this.props.data.id).then(res =>{
      this.setState({data: res.data});
    })
  }

  render() {
    return (
      <div>
        <Button style={{marginLeft: '0px'}} type="link" onClick={this.showModal}>
          { this.props.data.name }
        </Button>
        <Modal
          title="Company information"
          visible={this.state.visible}
          footer={
            <Row type="flex" justify="end">
              <Button type="primary" onClick={()=>{ this.setState({visible: false})}}>
                Ok
              </Button>
            </Row>
          }
        >
          <Row>
            <Row style={{marginBottom: '20px', display: this.state.data.description ? 'block' : 'none'}}>
              <span>
                {this.state.data.description}                
              </span>
            </Row>
            <Row>
              <Col span={8}>
                <span>
                  Company name:
                </span>
              </Col>
              <Col span={16}>
                {this.state.data.name}
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <span>
                  Contact person:
                </span>
              </Col>
              <Col span={16}>
                {this.state.data.firstname + ' ' + this.state.data.lastname}
              </Col>
            </Row>            
            <Row>
              <Col span={8}>
                <span>
                  Website:
                </span>
              </Col>
              <Col span={16}>
                {this.state.data.urls && this.state.data.urls.homePageUrl ? this.state.data.urls.homePageUrl : '' }
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <span>
                  Founded:
                </span>
              </Col>
              <Col span={16}>
                {this.state.data.establishingYear}
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <span>
                  Company ID:
                </span>
              </Col>
              <Col span={16}>
                {this.state.data.companyId}
              </Col>
            </Row>            
            <Row>
              <Col span={8}>
                <span>
                  Number:
                </span>
              </Col>
              <Col span={16}>
                {this.state.data.number}
              </Col>
            </Row>    
            <Row>
              socialmedia
            </Row>                                
          </Row>
        </Modal>
      </div>
    );
  }
}

export default JobResultItemCompanyInfoModal;