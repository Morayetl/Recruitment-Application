import React from 'react';
import { Row, Descriptions, Collapse } from 'antd';
import i18next from 'i18next';
import { getCodeSetByTypeAndValue } from '../../Utils/codeset';
import { CODESETS } from '../../Utils/constants';
import moment from 'moment';
import { getNameCategorybyId } from '../../Utils/category';

class JobResultInfoJobDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      jobType: '',
      endDate: '', 
      category: ''
    }
  }

  async componentDidMount(){
    await this.getDetails();
  }

  async componentDidUpdate(prevProps){
    if(this.props.details && JSON.stringify(prevProps.details) !== JSON.stringify(this.props.details)){
      await this.getDetails();
    }
  }

  async getDetails(){
    const details = this.props.details;
    const jobType = await getCodeSetByTypeAndValue(CODESETS.jobType,details.jobType);
    const category = await getNameCategorybyId(details.category);
    const endDate = moment(details.endDate).format('DD.MM.YYYY');
    this.setState({jobType: jobType.label, endDate: endDate, category: category});
  }

  render() {
    return (
      <div className="job-result-info">
        <Row style={{ margin: '20px'}}>
          <Descriptions
            style={{
              padding: '5px'
            }}
            bordered
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label={i18next.t('contact-person')}>{this.props.details ? this.props.details.contactPerson : null }</Descriptions.Item>
            <Descriptions.Item label={i18next.t('phone-number')}>{this.props.details ? this.props.details.phoneNumber : null }</Descriptions.Item>
            <Descriptions.Item label={i18next.t('location')}>{this.props.details ? this.props.details.location : null }</Descriptions.Item>
            {this.props.details &&  this.props.details.url ? <Descriptions.Item label={i18next.t('website')}> <a style={{wordBreak: 'break-word'}} href={this.props.details.url} rel="noopener noreferrer" target="_blank">{this.props.details.url}</a></Descriptions.Item>  : null }
            <Descriptions.Item label={i18next.t('job-type')}>{this.state.jobType}</Descriptions.Item>
            <Descriptions.Item label={i18next.t('category')}>{this.state.category}</Descriptions.Item>
            <Descriptions.Item label={i18next.t('due-date')}>{this.state.endDate}</Descriptions.Item>
            <Descriptions.Item label={i18next.t('job-id')}>{this.props.details ? this.props.details._id : null }</Descriptions.Item>
          </Descriptions>            
        </Row>
      </div>
    );
  }
}

export default JobResultInfoJobDetails;