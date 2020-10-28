import React from 'react';
import './FrontPageJobs.css';
import { Icon, Col, Row, Tag } from 'antd';
import {Transition} from 'react-spring/renderprops';
import { isInViewport } from '../../../Utils/utils';
import { Link } from 'react-router-dom';
import axios from '../../../Utils/axios';
import { CODESETS } from '../../../Utils/constants';
import { getCodeSetByTypeAndValue } from '../../../Utils/codeset';
import placeholder from '../../../images/no-image.png';
import i18next from 'i18next';

const tagColors = [
  'magenta',
  'volcano',
  'gold',
  'green',
  'blue',
  'purple'
]

class FrontPageJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      animateCategories: false,
      results:[]
    };
    this._isMounted = false;
    this.elements = [];
    this.setElement = this.setElement.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.checkViewPort = this.checkViewPort.bind(this);
    this.getFrontPageSuggestions = this.getFrontPageSuggestions.bind(this);
  }
  
  componentDidMount(){
    this._isMounted = true;
    window.addEventListener('scroll', this.handleScroll);
    setTimeout(this.checkViewPort,100);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((function(position) {
        this.getFrontPageSuggestions(position.coords.latitude, position.coords.longitude)
      }).bind(this),
      (function() {
        // if error or no permission with location search without it
        this.getFrontPageSuggestions()
      }).bind(this));
    }else{
      //if geolocation doesnt exist
      this.getFrontPageSuggestions()      
    }

  }

  getFrontPageSuggestions(latitude = null,longitude=null){
    axios.get('/jobs/search/front-page',{
      params:{
        latitude,
        longitude
      }
    }).then( async (res) => {
      const data = await Promise.all(res.data.map( async (value) => {
        return { ...value, jobType: await getCodeSetByTypeAndValue(CODESETS.jobType, value.jobType)}
      }));

      this.setState({results: data});
      return res;
    });
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  setElement(element){
    const elementCopy = this.state.elements;
    elementCopy.push(element);
  }

  handleScroll(){
    if(!this._isMounted) return;
    if(!this.state.elements) return;
    this.checkViewPort();
  }

  checkViewPort(){
    if(!this._isMounted) return;
    this.state.elements.forEach((element, index) => {
      if(isInViewport(element)){
        this.setState({animateCategories: true});
      }
    });    
  }
  
  render() {
    return (
      <div ref={this.setElement} style={{margin: '20px auto 20px auto'}}>
        <div className="container">
        {
          this.state.results.length > 0 ? 
            <Row justify="center" type="flex">
              <h1 style={{marginBottom: 0}}>
                {i18next.t('jobs')}
              </h1>
            </Row> :  null        
        }

        {this.state.results.map((value, index) =>{
          return(
            <div key={index} style={{minHeight: '100px'}}>
              <Transition
              items={ this.state.animateCategories }
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 1}}
              config={{
                duration: 200,
                delay: 200 * (index) 
              }}>
                {show => show && (props =>
                <Link to={ '/jobs?id='+ value._id+'&query='+encodeURIComponent(value.title)}>
                  <div style={props} className="front-page-jobs item">
                    <Row type="flex" style={{padding: '30px 20px 30px 20px'}}>
                      <Col xs={{span: 24}} sm={{span: 24}} md={{span: 4}} style={{display: 'flex'}}>
                        <img alt="company-pic" className="front-page-jobs" src={value.creator.image ? value.creator.image : placeholder } height="80" width="80"/>
                      </Col>
                      <Col xs={{span: 24}} sm={{span: 24}} md={{span: 10}}>
                        <Row type="flex">
                          <h1 className="text-overflow center-items" style={{marginBottom: 0, fontSize: '20px'}}>
                            {value.title}
                          </h1>
                        </Row>
                        <Row type="flex">
                          <span className="text-overflow center-items">
                            {value.creator.name}
                          </span>
                        </Row>
                      </Col>
                      <Col style={{marginTop: '10px'}} xs={{span: 24}} sm={{span: 24}} md={{span: 5}}>
                        <Row className="center-items" style={{alignContent: 'center', margin: 0}} type="flex">
                          <span className="text-overflow center-items">
                            <Icon type="environment" style={{fontSize: '25px', marginRight: '5px'}}/>
                            {value.location}
                          </span>
                        </Row>
                      </Col>
                      <Col style={{display: 'flex', marginTop: '10px'}} xs={{span: 24}} sm={{span: 24}} md={{span: 5}}>
                        <Row className="center-items" style={{alignContent: 'center'}} type="flex">
                          <Tag size="large" color={tagColors[value.jobType.value-1]}>
                            {value.jobType.label}
                          </Tag>                  
                        </Row>
                      </Col>
                    </Row>
                    </div>
                </Link>
                  )}
              </Transition>
            </div>
          ); 
        })}
        </div>
      </div>
    );
  }
}

export default FrontPageJobs;
