import React from 'react';
import { connect } from 'react-redux';
import './Jobs.css';
import Header from "../../Shared/Header/Header";
import { withRouter } from "react-router";

import { Col, Row, Form, Pagination, Icon, Drawer, Collapse } from 'antd';
import JobSearchForm from './JobSearchForm/JobSearchForm';
import JobResultItem from './JobResultItem/JobResultItem';
import Search from 'antd/lib/input/Search';
import { setPage, emptySearch, searchQuery, filterLocation, selectJob, filterCategory } from '../../redux/actions/search.actions';
import axios from '../../Utils/axios';
import JobResultInfoTab from './JobResultInfoTab';
import cookie from 'js-cookie';
import { USER_ROLES } from '../../Utils/constants';
import errorIcon from '../../icons/error.svg';
import i18next from 'i18next';

const styles = {
  sideBar: {
    backgroundColor: 'white'
  },
  container: {
    backgroundColor: '#f8f9fa',
    paddingTop: '10px',
    paddingBottom: '50px',
    flex: '1 1 auto'
  },
  searchInput: {
    //boxShadow: 'rgba(0, 0, 0, 0.2) 4px 2px 8px 0px, rgba(0, 0, 0, 0.1) 2px 4px 20px 0px',
    borderRadius: '4px'
  }
};

const { Panel } = Collapse;

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: [],
      joblistHeight: 0,
      selectedJobId: 0,
      selectedUserId: 0,
      companyData: {},
      details: null,
      activeTab: 'job',
      totalAmountOfResults: 0,
      drawerVisible: false,
      jobNotFoundError: '',
      resultsNotFound: false
    };

    this.jobListRef = React.createRef();
    this.updateSize = this.updateSize.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.hasApplied = this.hasApplied.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.updateScreenSize = this.updateScreenSize.bind(this);
    this.Search = this.Search.bind(this);
  }

  /**
   * Called when search button is clicked
   * @param {*} value 
   */
  onSearch(value) {
    const queryParams= window.location.search;
    const params = new URLSearchParams(queryParams); 
    params.set('query', value);
    params.delete('id');
    this.props.history.replace({
      pathname: '/jobs',
      search:   params.toString()
    });      
    this.props.dispatch(searchQuery({search_query: value}));
  }

  updateSize(){
    if(this.divRef && this.divRef.clientHeight && this.divRef.clientHeight !== this.state.joblistHeight){
      this.setState({ joblistHeight: this.divRef.clientHeight });
    }
  }

  componentDidUpdate(prevProps){
    const {
      search_query,
      jobType,
      category,
      location
    } = this.props;
    if (//page !== prevProps.page ||
          //per_page !== prevProps.per_page ||
          search_query !== prevProps.search_query ||
          jobType !== prevProps.jobType ||
          JSON.stringify(category) !== JSON.stringify(prevProps.category) ||
          location !== prevProps.location) {
      this.Search();
      this.setState({ loading: false });
    }
  }

  Search({query = '', location = '', page = 1, jobId = '', category = null} = {}){

    setTimeout(()=>{
      this.setState({ loading: true });
    });

    axios.post('/jobs/search',{
      page: page || this.props.page,
      per_page: this.props.per_page,
      search_query: query || this.props.search_query,
      jobType: this.props.jobType,
      category: this.props.category,
      location: this.props.location,
      jobId:  jobId
    })
    .then((res) => {
      const data = res.data.data;
      const total = res.data.total;
      this.props.dispatch(setPage({page: page}));
      this.setState({ results: data ? data : [] , totalAmountOfResults: total});

      setTimeout(()=>{
        this.setState({ loading: false });
      }, 300);

      if(this.jobListRef.current){
        this.jobListRef.current.scrollTo(0, 0);
      }

      // check if specific job that is inserted to the query param is found and set state
      if(!res.data.jobFound){
        this.setState({ jobNotFoundError: 'jobs-page-job-not-found' });
      }else{
        this.setState({ jobNotFoundError: '' });
      }

      if(data.length === 0){
        this.setState({resultsNotFound: true});
      }else{
        this.setState({resultsNotFound: false});
      }

      // selects the post if parameters job id is in the results and sets selected index as one
      if(data && data.length > 0 && jobId === data[0]._id){
        this.onSelectionChange({selectedUserId:data[0].creator.id, selectedJobId: jobId || data[0]._id , title: data[0].title, companyName:data[0].creator.name});
        this.props.dispatch(selectJob({index: 0}));
        this.showDrawer();
        return;
      }
      
      if(data && data.length > 0 && !jobId){
        this.onSelectionChange({selectedUserId:data[0].creator.id, selectedJobId: data[0]._id , title: data[0].title, companyName:data[0].creator.name});
        this.props.dispatch(selectJob({index: 0}));
      }else{
        this.props.dispatch(selectJob({index: null}));
      }
    });   
  }  

  componentDidMount() {
    document.title = i18next.t('jobs');
    this.setState({ joblistHeight: this.divRef.clientHeight });
    window.addEventListener('resize', this.updateSize);

    this.props.dispatch(filterLocation({location: this.props.location}));
    this.props.dispatch(filterCategory({category:this.props.category}));
    this.setParams();
    this.updateScreenSize()
  }

  /**
   * Drawer is shown for devices which width are smaller than 768px
   */
  showDrawer(){
    this.setState({drawerVisible: true});
  }

  setParams(){
    const queryParams= window.location.search;
    if(queryParams){
      const queryParams= window.location.search;

      const params = new URLSearchParams(queryParams); 
      const jobId = params.get('id') ? decodeURIComponent(params.get('id')) : null;
      this.Search({jobId:jobId});
    }else{
      this.props.dispatch(emptySearch({search:''}));
    }
  }
  
  getHeight() {
    if(this.divRef.clientHeight && this.divRef.clientHeight !== this.state.joblistHeight){
      this.setState({ joblistHeight: this.divRef.clientHeight });
    }
  }

  componentWillUnmount(){
    this.props.dispatch(emptySearch({search:''}));
  }

  onPaginationChange(page, pageSize){
    this.Search({page});
  }

  showPagination(){
    if(this.state.results.length > 0){
      return(
        <Row type="flex" style={{margin:'10px 0 10px'}} justify="center">
          <Pagination pageSize={this.props.per_page} current={this.props.page} total={this.state.totalAmountOfResults} onChange={this.onPaginationChange} defaultCurrent={1} />
        </Row>   
      )
    }
    return null;
  }

  jobNotFoundError(res){
    if(!res.status){
      this.setState({jobNotFoundError:''});
    }else{
      this.setState({jobNotFoundError:'jobs-page-job-not-found'});
    }
  }

  onSelectionChange({selectedUserId, selectedJobId, title, companyName}){

    
    const queryParams= window.location.search;
    const params = new URLSearchParams(queryParams); 
    params.set('id', selectedJobId);
    this.props.history.replace({
      pathname: '/jobs',
      search:   params.toString()
    });      
    

    this.setState({
      //companyData: {},
      selectedUserId: selectedUserId,
      selectedJobId: selectedJobId,
      activeTab: 'job',
      title: title,
      companyName: companyName
    });
    
    if(selectedJobId) {
      axios.get('/jobs/job/' + selectedJobId + '/details').then(res =>{
        this.setState({details: res.data, jobNotFoundError: ''});
      },this.jobNotFoundError);
      this.hasApplied(selectedJobId);
    }

    if(selectedUserId){
      axios.get('/user/employer/' + selectedUserId).then(res =>{
        this.setState({companyData: res.data, jobNotFoundError: ''});
      },this.jobNotFoundError);
    }
  }

  hasApplied(selectedJobId){
    if(cookie.get('role') === USER_ROLES.employee){
      axios.get('/jobs/employee/applied/' + selectedJobId).then(res =>{
        this.setState({hasApplied: res.data.hasApplied});
      });       
    }
  }

  onTabChange(value){
    this.setState({activeTab: value});
  }

  showJobInfoTab(){
    // if company informations exist and there isnt any error find
    if(this.state.companyName && !this.state.jobNotFoundError){
      return(
        <JobResultInfoTab 
          selectedJobId={this.state.selectedJobId}
          companyName={this.state.companyName}
          title= {this.state.title}
          onTabChange={this.onTabChange} 
          details={this.state.details} 
          activeTab={this.state.activeTab}
          companyData={this.state.companyData}
          hasApplied={this.state.hasApplied}
          hasAppliedRefresh={this.hasApplied}
        />             
      );      
    }

    if(this.state.jobNotFoundError){
      return(
        <div style={{display: 'flex', height: '100%'}}>
          <div style={{margin: '200px auto auto auto'}}>
            <div style={{width: '100%', display: 'flex'}}>
              <Icon style={{margin: 'auto auto 10px auto', fontSize: '90px', color: 'grey'}} component={errorIcon}/>
            </div>
            <div>
              <h1 style={{color: 'grey'}}>
                {i18next.t(this.state.jobNotFoundError)}                    
              </h1>
            </div>
          </div>
        </div>
      )
    }

  }

  showResults(){

    if(this.state.loading){
      return (
        <div className="flex-page-flex" style={{display: 'flex', height: '100%'}}><Icon style={{fontSize: '60px', margin: 'auto'}} type="loading" /></div>
      )
    }
    if(!this.state.resultsNotFound){
      return(
        <div className="flex-page-flex">
          <JobResultItem showDrawer={this.showDrawer} onChange={this.onSelectionChange} data={this.state.results}></JobResultItem>
          { this.showPagination() }
        </div>
      )
    }else{
      return(
        <div className="flex-page-flex" style={{display: 'flex', height: '100%'}}>
          <Row type="flex" justify="center" style={{margin: 'auto'}}>
            <div style={{width: '100%', display: 'flex'}}>
              <Row>
                <Row type="flex" justify="center">
                  <Icon style={{margin: 'auto auto 10px auto', fontSize: '90px', color: 'grey'}} type="search"/>
                </Row>
                <Row type="flex" justify="center">
                  <h1 style={{color: 'grey'}}>
                    {i18next.t('jobs-page-results-not-found')}                    
                  </h1>
                </Row>              
              </Row>
            </div>
          </Row>        
        </div>
      )
    }
  }

  updateScreenSize(){
    setTimeout(this.getHeight,400);
  }

  render() {
    
    return (
      <div style={{background: 'rgba(0,0,0,0.03)'}} className="jobs-page">
      {
        window.innerWidth < 768 ? 
          <Drawer
            width={'100%'}
            onClose={() => this.setState({drawerVisible: false}) }
            visible={this.state.drawerVisible}
            bodyStyle={{ paddingBottom: 80 }}
          >
            {this.showJobInfoTab()}
          </Drawer>        
        : 
        null
      }

        <div className="default-header">
          <Header/>
        </div>
        <Row className="container" style={{ background: 'white', border: 'solid 1px rgba(0,0,0,0.1)', borderBottom: '0', marginTop: '5px' , padding: '4px'}}>
          <div>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div style={{margin: '10px 10px 10px 10px'}}>
                <Form>
                  <Form.Item style={{margin: '0'}}>
                    <Search
                      defaultValue={this.props.search_query}
                      placeholder={i18next.t('jobs-page-search-input')}
                      enterButton={i18next.t('jobs-page-search-button')}
                      size="large"
                      style={styles.searchInput}
                      onSearch={value => this.onSearch(value)}
                    />
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </div>
        </Row>  
          <div className="container" style={{background: 'white'}}>
          <Collapse defaultActiveKey={['']} onChange={this.updateScreenSize} className="job-filter-custom-collapse">
            <Panel header={i18next.t('filters')} key="1" className="job-filter-custom-panel">
              <JobSearchForm/>
            </Panel>
          </Collapse>
             
          </div> 
          <div ref={element => this.divRef = element} className="jobs-page-search-view container" style={{background: 'white'}}>
            <Row type="flex" style={{minHeight: '100%'}} className="flex-page-flex">              
              <Col xs={24} sm={24} md={10} lg={10}>      
                <div ref={this.jobListRef} className="jobs-content " 
                  style={{
                    maxHeight: (this.state.joblistHeight) + 'px'
                  }}
                >
                  {this.showResults()}
                </div>
              </Col>
              { window.innerWidth >=  768 ? 
              (<Col xs={24} sm={24} md={14} lg={14}>
                <div className="jobs-content" 
                        style={{
                          minHeight: (this.state.joblistHeight) + 'px',
                          borderLeft: '1px solid rgba(0,0,0,0.1)'
                        }}
                  >
                 { this.showJobInfoTab()}
                </div>                      
              </Col>) : null }
            </Row>            
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  const { searchReducer } = state;

  const queryParams= window.location.search;

  const params = new URLSearchParams(queryParams); 
  const categoryId = params.get('categoryId') ? decodeURIComponent(params.get('categoryId')) : null;
  const loc = params.get('location') ? decodeURIComponent(params.get('location')) : null;
  const query = params.get('query') ? decodeURIComponent(params.get('query')) : null;

  const splittedCategory = categoryId ? categoryId.split(',') : null;
  const {
    page,
    per_page,
    search_query,
    jobType,
    //category,
    location
  } = searchReducer;

  return {
    page,
    per_page,
    search_query: query || search_query,
    jobType,
    category: splittedCategory,
    location: location || loc
  };
}

export default withRouter(connect(mapStateToProps )(Jobs));
