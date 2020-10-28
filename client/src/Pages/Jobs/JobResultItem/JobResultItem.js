import React from 'react';
import { connect } from 'react-redux';
import './JobResultItem.css';
import { Icon, Avatar, Row, Col } from 'antd';
import { setPage, selectJob } from '../../../redux/actions/search.actions';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import noImage from '../../../images/no-image.png';

class JobResultItem extends React.Component {

  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onJobSelected = this.onJobSelected.bind(this);
  }

  setPage(value){
    this.props.dispatch(setPage({page: value}));
  }

  componentDidMount() { }

  onClick(value){
    this.props.onChange(value);
  }

  calculateTimeAgo(date){
    const startDate = moment(date);
    const timeEnd = moment(new Date());
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);

    const hours = diffDuration.hours();
    const days = diffDuration.days();
    const minutes = diffDuration.minutes();
    const months = diffDuration.months();

    if(months  > 0){
      return months + ' ' + this.props.t('jobs-page-search-result-item-months-ago');
    }

    if(days  > 0){
      return days + ' ' + this.props.t('jobs-page-search-result-item-days-ago');
    }

    if(hours > 0){
      return hours + ' ' + this.props.t('jobs-page-search-result-item-hours-ago');
    }

    return minutes + ' ' + this.props.t('jobs-page-search-result-item-minutes-ago');
  }

  onJobSelected(item, index){
    if(this.props.showDrawer){
      this.props.showDrawer();
    }
    this.onClick({selectedUserId: item.creator.id, selectedJobId: item._id, title: item.title, companyName: item.creator.name})
    this.props.dispatch(selectJob({index: index}));
  }

  
  render() {
    return (
        <div>

            {this.props.data.map((item,index) => {           
              return(
              <div className="job-result-item" style={{padding: '15px', borderLeft: this.props.selectedJob === index ? '4px solid rgba(83, 51, 237, 1)': '', borderBottom: '1px solid rgba(0,0,0,0.1)', height: '100px', background: item.showFeatured ? 'rgb(255,255,153)' : ''}} onClick={() => {this.onJobSelected(item, index)}} key={index}>
                <Row type="flex">
                  <Col>
                    <Avatar shape="square" size={50} src={item.creator.image || window.location.origin + '/' + noImage}/>
                  </Col>

                  <Col style={{flex: 1, overflow: 'hidden', marginRight: '10px'}}>
                    <div style={{ margin: '0px 0px 0px 10px'}}>
                      <Row type="flex" justify="space-between">
                        <Col className="text-overflow">
                          <span >
                            {item.title}
                          </span>

                        </Col>
                      </Row>
                      <span style={{color: 'rgb(140, 145, 220)', display: 'block'}} className="text-overflow"> {item.creator ? item.creator.name : ''} </span>
                    </div>
                    <div style={{marginLeft: '10px', display: 'block'}} className="text-overflow">
                      <Icon type="environment" style={{ color: 'rgba(0,0,0,.5)' , margin: '0px 5px 0px 0px'}}/>
                      <span>
                        {item.location}
                      </span>                      
                    </div>                    
                  </Col>
                  <Col>
                    <span>
                      {
                        this.calculateTimeAgo(item.startDate)
                      }
                    </span>         
                    <div>
                      {
                        item.showFeatured ? (<span style={{fontWeight: 'bold', color: 'red'}}>{this.props.t('jobs-page-search-result-item-featured')}</span>) : null
                      }                      
                    </div>               
                  </Col>
                </Row>
                              
              </div>)                                            
            })} 
        </div>
    );
  }
}

const mapStateToProps = state => {
  const { searchReducer } = state;
  const {
    page,
    per_page,
    selectedJob
  } = searchReducer;

  return {
    page,
    per_page,
    selectedJob
  };
}

export default withTranslation()(connect(mapStateToProps)(JobResultItem));