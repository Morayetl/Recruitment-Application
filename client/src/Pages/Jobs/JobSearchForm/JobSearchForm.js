import React from 'react';
import './JobSearchForm.css';
import {connect} from 'react-redux';
import { Row, Tooltip, Icon, Col } from 'antd';
import { withRouter } from "react-router";

import SearchCategory from '../../../Shared/Form-Items/SearchCategory/SearchCategory';
import SearchLocation from '../../../Shared/Form-Items/SearchLocation/SearchLocation';
import SearchJobType from '../../../Shared/Form-Items/SearchJobType/SearchJobType';
import { filterJobType, filterCategory, filterLocation } from '../../../redux/actions/search.actions';
import { withTranslation } from 'react-i18next';

class JobSearchForm extends React.Component {
  constructor(props){
    super(props);
    this.onSearchCategoryChange = this.onSearchCategoryChange.bind(this);
    this.onSearchLocationChange = this.onSearchLocationChange.bind(this);
    this.onSearchJobtypeChange = this.onSearchJobtypeChange.bind(this);
  }

  onSearchCategoryChange(value){
    this.updateUrl('categoryId', value);
    this.props.dispatch(filterCategory({category:value}));
  }

  onSearchLocationChange(value){
    this.updateUrl('location', value);
    this.props.dispatch(filterLocation({location: value}));
  }

  onSearchJobtypeChange(value){
    this.props.dispatch(filterJobType({jobType: value}));
  }

  updateUrl(paramName, value){
    const queryParams= window.location.search;
    const params = new URLSearchParams(queryParams); 
    params.set(paramName, value || '');

    this.props.history.replace({
      pathname: '/jobs',
      search:   params.toString()
    });     
  }

  render() {
    return (
      <Row style={{ border: 'solid 1px rgba(0,0,0,0.1)', marginTop: '0px' , padding: '4px'}} >
          <Col style={{ padding: '4px' }} sm={{span:24}} md={{span:8}}>
            <Row>
              <label>
                {this.props.t('jobs-page-search-form-category')}
              </label>
            </Row>                    
            <SearchCategory multiple={true} defaultValue={this.props.category} onChange={this.onSearchCategoryChange}></SearchCategory>
          </Col>
          <Col style={{padding: '4px'}} sm={{span:24}} md={{span:8}}>
            <Row>
              <label>
                {this.props.t('jobs-page-search-form-location')}
              </label>
            </Row>  
            <Row>
              <SearchLocation default={this.props.location} onChange={this.onSearchLocationChange}></SearchLocation> 
            </Row>                    
          </Col>
          <Col style={{padding: '4px'}} sm={{span:24}} md={{span:8}}>
              <Row>
                <label>
                  {this.props.t('jobs-page-search-form-job-type')}
                </label>
              </Row>          
              <Row>
                <SearchJobType defaultValue={this.props.jobType} onChange={this.onSearchJobtypeChange}></SearchJobType>                 
              </Row>           
          </Col>                    
      </Row>
    );
  }
  
}

const mapStateToProps = state => {
  const { searchReducer } = state;
  const { category, location, jobType } = searchReducer;

  return {
    category,
    location,
    jobType
  }
};

export default withTranslation()(withRouter(connect(mapStateToProps)(JobSearchForm)));
