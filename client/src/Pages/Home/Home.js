import React from 'react';
import './Home.css';
import Header from "../../Shared/Header/Header";
import { Row, Col, Icon } from 'antd';
import SearchBox from './SearchBox/SearchBox';
import buildingSvg from '../../icons/building.svg';
import world from '../../icons/worldwide.svg';
import network from '../../icons/network.svg';
import axios from '../../Utils/axios';
import TopCategories from './TopCategories/TopCategories';
import {Spring, Transition} from 'react-spring/renderprops';
import * as easings from 'd3-ease'
import ServicesSection from './ServicesSection/ServicesSection';
import FrontPageJobs from './FrontPageJobs/FrontPageJobs';
import Footer from '../../Shared/Footer/Footer';
import i18next from 'i18next';
import { APP_NAME } from '../../Utils/constants';
import {Helmet} from "react-helmet";

const style = {
  jumbotron: {
    minHeight: '70vh',
    display: 'flex'
  },
  jumbotronContent: {
    margin: 'auto',
    minWidth: '70%'
  },
  jumbotronContentText: {
    justifyContent: 'center',
    display: 'flex'
  },
  jumbotronContentLogo: {
    alignSelf: 'center',
    marginRight: '10px'
  },
  jumbotronContentTextContainer: {
    margin: '30px 0px 30px 0px'
  },
  boldText: {
    fontWeight: 'bold',
    color: 'white'
  }
}

const numberAnimatorConfig = {
  delay: 0,
  duration: 2000,
  easing: easings.easeCubic
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeAmount: 0,
      employerAmount: 0,
      jobAmount:      0,
      animateContainer: false
    };
  }

  componentDidMount(){
    document.title = APP_NAME + ' - ' + i18next.t('home-page-jumboTitle');
    setTimeout((function(){
      //animate search box
      this.setState({animateContainer: true});      
    }).bind(this));
    
    axios.get('/user/info').then((res) =>{
      res.data.forEach(value => {

        if(value.role === 'employer'){
          this.setState({employerAmount: value.count})
        }

        if(value.role === 'employee'){
          this.setState({employeeAmount: value.count})
        }
      })
    });

    axios.get('/user/info/jobs').then((res) =>{
      this.setState({jobAmount: res.data.count ? res.data.count : 0})
    });
  }

  showNumbers(){
    if(this.state.employeeAmount < 1000){
      return null;
    }

    return(
      <Row style={style.jumbotronContentTextContainer}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div >
            <Row style={style.jumbotronContentText}>
              <div style={style.jumbotronContentLogo}>
                <Icon className="custom-icon" style={{ fontSize: '60px', marginBottom: '25px' }} component={buildingSvg} />
              </div>
              <div>
                <Spring
                  from={{ number: 0 }}
                  to={{ number: this.state.employerAmount }}
                  config={numberAnimatorConfig}
                  >
                  {props => <h3 style={style.boldText}>{Math.floor(props.number)}</h3>}
                </Spring>
                <span>
                  {i18next.t('home-page-icon-1-text')}
              </span>
              </div>
            </Row>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div >
            <Row style={style.jumbotronContentText}>
              <div style={style.jumbotronContentLogo}>
                <Icon className="custom-icon" style={{ fontSize: '60px', marginBottom: '25px' }} component={world} />
              </div>
              <div>
                <Spring
                  from={{ number: 0 }}
                  to={{ number: this.state.jobAmount }}
                  config={numberAnimatorConfig}
                  >
                  {props => <h3 style={style.boldText}>{Math.floor(props.number)}</h3>}
                </Spring>
                <span>
                  {i18next.t('home-page-icon-2-text')}
                </span>
              </div>
            </Row>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div >
            <Row style={style.jumbotronContentText}>
              <div style={style.jumbotronContentLogo}>
                <Icon className="custom-icon" style={{ fontSize: '60px', marginBottom: '25px' }} component={network} />
              </div>
              <div>
                <Spring
                  from={{ number: 0 }}
                  to={{ number: this.state.employeeAmount }}
                  config={numberAnimatorConfig}
                  >
                  {props => <h3 style={style.boldText}>{Math.floor(props.number)}</h3>}
                </Spring>
                <span>
                  {i18next.t('home-page-icon-3-text')}
                </span>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <Row>
        <div className="jumbotron-background">
          <Header></Header>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{`${APP_NAME} - ${i18next.t('home-page-jumboTitle')}`}</title>
            <meta name="title" content={`${APP_NAME} - ${i18next.t('home-page-jumboTitle')}`}></meta>
            <meta name="description" content={i18next.t('home-page-jumboTitle2')}></meta>

            <meta property='og:title' content={`${APP_NAME} - ${i18next.t('home-page-jumboTitle')}`}/>
            <meta property="og:description" content={i18next.t('home-page-jumboTitle2')}/>
            <meta property="og:url" content={window.location.href} />

            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:site" content={window.location.href} />
            <meta name="twitter:title" content={`${APP_NAME} - ${i18next.t('home-page-jumboTitle')}`}/>
            <meta name="twitter:description" content={i18next.t('home-page-jumboTitle2')}/>                         
          </Helmet> 
          <div className="container" style={style.jumbotron}>
            <Transition 
              items={{show: this.state.animateContainer}}
              from={{ opacity: 0 , transform: 'translateY(50px)'}}
              enter={{ opacity: 1, transform: 'translateY(0px)'}}
              leave={{ opacity: 1, transform: 'translateY(0px)'}}
              config={{
                duration: 1000,
                delay: 500,
                easing: easings.easeSinOut
              }}
              >
            {show => show && (props =>
              <div style={{...style.jumbotronContent, ...props}}>
                <div style={{...style.jumbotronContentText, marginTop: '10px'}}>
                  <h4 style={{ textAlign: 'center' }}>
                    {i18next.t('home-page-jumboTitle')}
                  </h4>
                </div>
                <div style={{...style.jumbotronContentText, marginBottom: '10px'}}>
                  <h1 style={{ textAlign: 'center' }}>
                    {i18next.t('home-page-jumboTitle2')}
                  </h1>
                </div>
                { this.showNumbers()}
                <div style={{margin: 'auto 10px auto 10px'}}>
                  <SearchBox></SearchBox>                
                </div>
              </div>
            )}
            </Transition>
          </div>
        </div>
        <div className="container">
          <TopCategories/>
        </div>
        <ServicesSection/>
        <FrontPageJobs/>
        <Footer/>
      </Row>
    );
  }
}

export default Home;


