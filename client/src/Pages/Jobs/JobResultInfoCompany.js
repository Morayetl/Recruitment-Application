import React from 'react';
import { Row, Descriptions } from 'antd';
import axios from '../../Utils/axios';
import { withTranslation } from 'react-i18next';
import { SocialIcon } from 'react-social-icons';
import moment from 'moment';
import { DATE_FORMAT } from '../../Utils/constants';

const style={
  linkStyle:{
    margin: 'auto auto auto 5px'
  }
}
class JobResultInfoCompany extends React.Component {
  state = {
    establishingYear: null
  }
  
  componentDidMount(){
    this.setDate();
  }

  componentDidUpdate(prevProps){
    if(this.props.data && JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)){
      this.setDate();
    }
  }

  setDate(){
    this.setState({establishingYear: moment(this.props.data.establishingYear).format(DATE_FORMAT)});
  }
  
  showModal = () => {
    axios.get('/user/employer/' + this.props.data.id).then(res =>{
      this.setState({data: res.data});
    })
  }

  render() {
    return (
      <Row style={{padding:'20px', wordBreak: 'break-word'}}>
        <Descriptions layout="horizontal" title={this.props.t('company-info')} column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
          {this.props.data.description ? <Descriptions.Item>{this.props.data.description}</Descriptions.Item> : ''}
          {this.props.data.name ? <Descriptions.Item label={this.props.t('company-name')}>{this.props.data.name}</Descriptions.Item> : ''}
          {this.props.data.firstname || this.props.data.lastname ? <Descriptions.Item label={this.props.t('full-name')}>{this.props.data.firstname + ' ' + this.props.data.lastname}</Descriptions.Item> : ''}
          {this.props.data.urls && this.props.data.urls.homePageUrl ? <Descriptions.Item label={this.props.t('website')}><a href={this.props.data.urls.homePageUrl} rel="noopener noreferrer" target="_blank">{this.props.data.urls.homePageUrl}</a></Descriptions.Item> : ''}
          {this.state.establishingYear ? <Descriptions.Item label={this.props.t('founded')}>{this.state.establishingYear}</Descriptions.Item> : ''}
          {this.props.data.companyId ? <Descriptions.Item label={this.props.t('company-id')}>{this.props.data.companyId}</Descriptions.Item> : ''}
          {this.props.data.number ? <Descriptions.Item label={this.props.t('phone-number')}>{this.props.data.number}</Descriptions.Item> : ''}
        </Descriptions>
        <Row>
          {this.props.data.urls && this.props.data.urls.githubPageUrl ? <SocialIcon style={style.linkStyle} url={this.props.data.urls.githubPageUrl} rel="noopener noreferrer" target="_blank" network="github"/> : ''}
          {this.props.data.urls && this.props.data.urls.googlePageUrl ? <SocialIcon style={style.linkStyle} url={this.props.data.urls.googlePageUrl} rel="noopener noreferrer" target="_blank" network="google"/>: ''}
          {this.props.data.urls && this.props.data.urls.linkedinPageUrl ? <SocialIcon style={style.linkStyle} url={this.props.data.urls.linkedinPageUrl} rel="noopener noreferrer" target="_blank" network="linkedin"/> : ''}
          {this.props.data.urls && this.props.data.urls.facebookPageUrl ? <SocialIcon style={style.linkStyle} url={this.props.data.urls.facebookPageUrl} rel="noopener noreferrer" target="_blank" network="facebook"/>: ''}
          {this.props.data.urls && this.props.data.urls.twitterPageUrl ? <SocialIcon style={style.linkStyle} url={this.props.data.urls.twitterPageUrl} rel="noopener noreferrer" target="_blank" network="twitter"/>: ''}
        </Row>                                
      </Row>
    );
  }
}

export default withTranslation()(JobResultInfoCompany);