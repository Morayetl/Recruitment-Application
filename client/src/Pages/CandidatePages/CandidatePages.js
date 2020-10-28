import React from 'react';
import './CandidatePages.css';
//import { Affix, Button, Menu, Icon } from 'antd';
import { Col, Row } from 'antd';
import Header from '../../Shared/Header/Header';
import PostJob from './PostJob/PostJob';
import CandidateSideMenu from './CandidateSideMenu/CandidateSideMenu'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import WrappedChangePasswordForm from '../../Shared/Forms/ChangePasswordForm/ChangePasswordForm';
import WrappedCandidateProfileFormForm from './CandidateProfile/CandidateProfileForm';
import MyResume from './MyResume/MyResume';
import JobAlerts from './JobAlerts/JobAlerts';
import AppliedJobs from './AppliedJobs/AppliedJobs';
import { withRouter } from "react-router";
import i18next from 'i18next';
import Attachments from './Attachments/Attachments';


class CandidatePages extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      header : ''
    }
  }

  componentDidMount(){
    this.setHeader(this.props.location.pathname);
    this.unlisten = this.props.history.listen((location, action) => {
      this.setHeader(location.pathname);
    });
  }

  setHeader(path){
    let header = '';

    switch(path){
      case '/user/profile':
        header = 'candidate-menu-item-my-profile';
        break;
      case '/user/resume':
        header = 'candidate-menu-item-my-resume';
        break; 
      case '/user/attachments':
        header = 'candidate-menu-item-attachments';
        break;          
      case '/user/applied-jobs':
        header = 'candidate-menu-item-applied-jobs';
        break; 
      case '/user/job-alerts':
        header = 'candidate-menu-item-job-alert';
        break;      
      case '/user/change-password':
        header = 'change-password';   
        break;
      default:
        header ='';
    }
    this.setState({header: header});
    document.title = i18next.t(header);
  }

  componentWillUnmount(){
    this.unlisten();
  }

  render() {
    return (
      <div className="flex-page">
        <div className="default-header">
          <Header></Header>
        </div>
        <div style={{background: 'rgba(0,0,0,0.03)',display:'flex', flex: '1 1 auto', height: 'auto' }}>
          <div className="container container-styling">
            <Row type="flex" style={{minHeight: '100%'}}>
              <Col xs={0} sm={0} md={6} lg={6} xl={6}>
              <div className="sidemenu-border" style={{minHeight: '100%' }}>
                <CandidateSideMenu page={this.props.location.pathname.split("/")[2]} onChange={this.onSideMenuChange} />
              </div>           
              </Col>
              <Col className="employer-page-content" xs={24} sm={24} md={18} lg={18} xl={18}>
                <div>
                  <h2 style={{ margin: '20px 0px 20px 0px'}}>
                    {i18next.t(this.state.header)}
                  </h2>
                </div>
                <div style={{ margin: '20px 0px 20px 0px'}}>
                  <Switch>
                    <Route path='/user/profile' component={WrappedCandidateProfileFormForm}/>
                    <Route path='/user/post-new-job' component={PostJob} />  
                    <Route path='/user/change-password' component={WrappedChangePasswordForm} />
                    <Route path='/user/resume' component={MyResume}/>
                    <Route path='/user/attachments' component={Attachments}/>
                    <Route path='/user/applied-jobs' component={AppliedJobs}/>
                    <Route path='/user/job-alerts' component={JobAlerts}/>
                    <Redirect to="/user/profile" component = {WrappedCandidateProfileFormForm}/>
                  </Switch>
                </div>
              </Col>
            </Row>      
          </div>           
        </div>
        
      </div>
    );
  }
}

export default withRouter(CandidatePages);
