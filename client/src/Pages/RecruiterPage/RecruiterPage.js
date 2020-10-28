import React from 'react';
import './RecruiterPage.css';
//import { Affix, Button, Menu, Icon } from 'antd';
import { Col, Row } from 'antd';
import Header from '../../Shared/Header/Header';
import PostJob from './PostJob/PostJob';
import RecruiterSideMenu from './RecruiterSideMenu/RecruiterSideMenu'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import WrappedChangePasswordForm from '../../Shared/Forms/ChangePasswordForm/ChangePasswordForm';
import WrappedCompanyProfileFormForm from './CompanyProfile/CompanyProfileForm';
import ManageJobs from './ManageJobs/ManageJobs';
import EmployerTransactions from './EmployerTransactions/EmployerTransactions';
import Packages from './Packages/Packages';
import JobApplicationAlerts from './JobApplicationAlerts/JobApplicationAlerts';
import i18next from 'i18next';


class RecruiterPage extends React.Component {

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
      case '/employer/company-profile':
        header = 'recruiter-menu-item-company-profile';
        break;
      case '/employer/manage-jobs':
        header = 'recruiter-menu-item-manage-jobs';
        break; 
      case '/employer/transactions':
        header = 'recruiter-menu-item-transactions';
        break;          
      case '/employer/resumes':
        header = 'recruiter-menu-item-resumes';
        break; 
      case '/employer/packages':
        header = 'recruiter-menu-item-purchased-items';
        break;      
      case '/employer/job-application-alerts':
        header = 'recruiter-menu-item-job-application-alerts';   
        break;
      case '/employer/change-password':
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
      <div className="employer-page">
        <div className="default-header">
          <Header></Header>
        </div>
        <div style={{background: 'rgba(0,0,0,0.03)', display:'flex', flex: '1 1 auto', height: 'auto' }}>
          <div className="container" style={{border: '1px solid rgba(0,0,0,0.1)', margin: '5px auto 10px', padding:'10px'}}>
            <Row type="flex" style={{minHeight: '100%'}}>
              <Col xs={0} sm={0} md={6} lg={6} xl={6}>
              <div className="sidemenu-border" style={{minHeight: '100%' }}>
                <RecruiterSideMenu page={this.props.location.pathname.split("/")[2]} onChange={this.onSideMenuChange} />
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
                    <Route path='/employer/company-profile' component={WrappedCompanyProfileFormForm}/>
                    <Route path='/employer/post-new-job' component={PostJob} />  
                    <Route path='/employer/change-password' component={WrappedChangePasswordForm} />
                    <Route path='/employer/manage-jobs' component={ManageJobs}/>
                    <Route path='/employer/transactions' component={EmployerTransactions}/>
                    <Route path='/employer/packages' component={Packages}/>
                    <Route path='/employer/job-application-alerts' component={JobApplicationAlerts}/>
                    <Redirect to="/employer/company-profile" component = {WrappedCompanyProfileFormForm}/>
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

export default RecruiterPage;
