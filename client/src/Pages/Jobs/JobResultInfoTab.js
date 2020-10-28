import React from 'react';
import './Jobs.css';

import { Tabs, Row, Col, Avatar, Icon } from 'antd';
import JobResultInfoJob from './JobResultInfoJob';
import JobResultInfoCompany from './JobResultInfoCompany';
import JobApplyModal from './JobApplyModal/JobApplyModal';
import GoogleAd from '../../Utils/google-ad';
import { withTranslation } from 'react-i18next';
import cookie from 'js-cookie';
import noImage from '../../images/no-image.png';
import { COOKIES, USER_ROLES, APP_NAME } from '../../Utils/constants';
import {Helmet} from "react-helmet";
import i18next from 'i18next';
import JobResultInfoJobDetails from './JobResultInfoJobDetails';

const { TabPane } = Tabs;

class JobResultInfoTab extends React.Component {
  constructor(props) {
    super(props);
    this.renderTabBar = this.renderTabBar.bind(this);
    this.renderHelmet = this.renderHelmet.bind(this);
  }

  showApplyButton(){
    const role = cookie.get(COOKIES.role);
    const auth = cookie.get(COOKIES.authorization);
    
    // check if hasnt applied to the job and user is a jobseeker with auth token
    if(!this.props.hasApplied && role !== USER_ROLES.employer){
      return <JobApplyModal selectedJobId={this.props.selectedJobId} hasApplied={this.props.hasAppliedRefresh}/>;
    }

    if(this.props.hasApplied && auth && role && role === USER_ROLES.employee){
      return <span style={{margin: '0px 10px auto auto'}}>
        <Icon type="check" style={{color: 'green', marginRight: '5px'}} />
        {i18next.t('jobs-page-job-applied')}
      </span>
    }
    return null;
  }

  renderTabBar(props, DefaultTabBar){
    return (
      <div>
          <div style={{padding: '10px', display:'flex'}}>
            <Row type="flex">
                <Col>
                  <Avatar shape="square" size={60} src={this.props.companyData.image || window.location.origin + '/' + noImage} style={{marginRight: '10px'}} />
                </Col>
                <Col>
                  <div>
                      <h2 style={{ margin: 0}}>
                          {this.props.companyName}
                      </h2>
                  </div>
                  <div>
                      <h4>
                          {this.props.title}
                      </h4>                        
                  </div>
                </Col>
            </Row>
            { this.showApplyButton() }
          </div>
          <div>
            <DefaultTabBar {...props} style={{ zIndex: 1, background: '#fff' }} />
          </div>              
      </div>
    )
  }

  renderHelmet(){
    if(this.props.title && this.props.details && this.props.details.description){
      return(
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${i18next.t('jobs')} - ${this.props.title}`}</title>
          <meta name="title" content={`${i18next.t('jobs')} - ${this.props.title}`}></meta>
          <meta name="description" content={this.props.details.description}></meta>

          <meta property='og:title' content={`${APP_NAME} - ${this.props.title}`}/>
          <meta property="og:description" content={this.props.details.description}/>
          <meta property="og:url" content={window.location.href} />

          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:site" content={window.location.href} />
          <meta name="twitter:title" content={`${APP_NAME} - ${this.props.title}`}/>
          <meta name="twitter:description" content={this.props.details.description}/>                        
        </Helmet> 
      );      
    }
    return null;
  }

  render() {  
    return (
        <div>
          {this.renderHelmet()}         
          <Tabs activeKey={this.props.activeTab} onChange={ this.props.onTabChange } renderTabBar={this.renderTabBar}>
              <TabPane tab={this.props.t('jobs-page-search-result-tab-job-title')} key="job">
                <div style={{ maxHeight: '150px', overflow: 'hidden' }}>
                  <GoogleAd/>
                </div>
                <JobResultInfoJob details={this.props.details}/>
              </TabPane>
              <TabPane tab={this.props.t('details')} key="details">
                <JobResultInfoJobDetails details={this.props.details}/>
              </TabPane>
              <TabPane tab={this.props.t('jobs-page-search-result-tab-company-title')} key="company">
                <JobResultInfoCompany data={this.props.companyData} />
              </TabPane>
          </Tabs>            
        </div>
    );
  }
}

export default withTranslation()(JobResultInfoTab);