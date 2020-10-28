import React, { useState } from 'react';
import './ServicesSection.css';
import { Icon, Col, Row, Button } from 'antd';
import jobseekersIcon from '../../../icons/jobseeker-service-section.svg';
import recruitersIcons from '../../../icons/recruiters.svg';
import globalizationIcon from '../../../icons/globalization.svg';
import {Transition} from 'react-spring/renderprops';
import { isInViewport } from '../../../Utils/utils';
import { withTranslation } from 'react-i18next';
import { SignUpContext } from '../../../Shared/Modals/SignUpModal/SignUpContext';
import cookie from 'js-cookie'
import { COOKIES } from '../../../Utils/constants';
import i18next from 'i18next';
import { withRouter } from "react-router";
import recruiterImage from '../../../images/register-recruiter.jpg';
import jobsImage from '../../../images/register-job-seeker.jpg';


const style = {
  formItem: {
    width: '100%',
    height: '50px'
  },
  formItemContainer: {
    color: 'white'
  },
  background: {
    borderRadius: '6px',
    background: 'rgba(192,192,192, 0.2)',
    padding: '10px',
    marginBottom: '20px'
  }
}

const Section = (props) => {
  const [animate, setAnimate] = useState(false);
  let element = null;
  
  const handleScroll = () => {
    if(!element) return;
    checkViewPort();
  }

  const checkViewPort = () => {
      if(isInViewport(element)){
        setAnimate(true);
      }
  }

  window.addEventListener('scroll', handleScroll);
  setTimeout(checkViewPort,100);

  return(
    <span ref={el => {element = el;}}>
    <Transition
      items={ animate }
      from={{ opacity: 0 , transform: 'translateY(0)'}}
      enter={{ opacity: 1, transform: 'translateY(0)'}}
      leave={{ opacity: 1, transform: 'translateY(0)'}}
      config={{
        duration: 800,
        delay: 800 * (props.data.index) 
      }}
    >
    {show => show && (animationProps =>
      <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{...style.formItemContainer, ...animationProps}}>
        <div style={{margin: '30px 15px 30px 15px'}}>
          <div style={{margin: 'auto'}}>
            <Row type="flex" justify="center">
              <Icon component={props.data.icon} style={{fontSize: '80px'}}/>
            </Row>
            <Row type="flex" justify="center">
              <span style={{marginTop: '10px'}}>
                {props.data.title}
              </span>
            </Row>                
            <Row type="flex" justify="center">
              <span align="center" style={{marginTop: '10px'}}>
                {props.data.description}
              </span>
            </Row>     
          </div>
        </div>
      </Col>  
    )}       
    </Transition>
    </span>
  );
}


class ServicesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail',
      elements: [],
      animateCategories: false
    };
    this._isMounted = false;
    this.elements = [];
    this.setElement = this.setElement.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.renderServices = this.renderServices.bind(this);
    this.checkViewPort = this.checkViewPort.bind(this);
    this.onGlobalButtonClick = this.onGlobalButtonClick.bind(this);
    this.onEmployersButtonClick = this.onEmployersButtonClick.bind(this);

    this.content = [
      {
        title: "home-page-services-section-title-1", 
        description: "home-page-services-section-paragraph-1", 
        icon: jobseekersIcon, 
        background: 'rgba(195, 55, 100,0.85)',
        order: 0,
        buttonText: 'home-page-services-section-join-jobseeker',
        textColor: 'white',
        onButtonClick: null,
        isJoinButton: true,
        image: recruiterImage
      },
      {
        title: "home-page-services-section-title-2", 
        description: "home-page-services-section-paragraph-2", 
        icon: recruitersIcons, 
        background: 'white',
        order: 1,
        buttonText: 'home-page-services-section-join-recruiter',
        textColor: 'rgba(0, 0, 0, 0.85)',
        onButtonClick: this.onEmployersButtonClick,
        isJoinButton: true,
      },
      {
        title: "home-page-services-section-title-3", 
        description: "home-page-services-section-paragraph-3", 
        icon: globalizationIcon, 
        background: 'rgba(29, 38, 113, 0.85)',
        order: 0,
        buttonText: 'home-page-services-section-see-jobs',
        textColor: 'white',
        onButtonClick: this.onGlobalButtonClick,
        isJoinButton: false,
        image: jobsImage
      }
    ]
  }
  
  componentDidMount(){
    this._isMounted = true;
    window.addEventListener('scroll', this.handleScroll);
    setTimeout(this.checkViewPort,100);
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  setElement(element){
    const elementCopy = this.state.elements;
    elementCopy.push(element);
  }

  handleScroll(){
    if(!this.state.elements || !this._isMounted) return;
    this.checkViewPort();
  }

  checkViewPort(){
    if(!this._isMounted) return;
    this.state.elements.forEach((element) => {
      if(isInViewport(element)){
        this.setState({animateCategories: true});
      }
    });    
  }

  onGlobalButtonClick(){
    this.props.history.push('/jobs');
  }

  onEmployersButtonClick(){
    this.props.history.push('/employers');
  }

  renderServices(title, description, icon, delay = 1){
    return(
      <Transition
        key={delay}
        items={ this.state.animateCategories }
        from={{ opacity: 0 , transform: 'translateY(0)'}}
        enter={{ opacity: 1, transform: 'translateY(0)'}}
        leave={{ opacity: 1, transform: 'translateY(0)'}}
        config={{
          duration: 600,
          delay: 600 * delay 
        }}
      >
      {show => show && (props =>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{...style.formItemContainer, ...props}}>
          <div style={{margin: '30px 15px 20px 15px'}}>
            <div style={{margin: 'auto'}}>
              <Row type="flex" justify="center">
                <Icon component={icon} style={{fontSize: '80px'}}/>
              </Row>
              <Row type="flex" justify="center">
                <span style={{marginTop: '10px'}}>
                  {this.props.t(title)}
                </span>
              </Row>                
              <Row type="flex" justify="center">
                <span align="center" style={{marginTop: '10px'}}>
                  {this.props.t(description)}
                </span>
              </Row>     
            </div>
          </div>
        </Col>  
      )}       
      </Transition>
    );
  }

  renderIntro(title, description, icon, delay = 1, background = '#C33764', order= 1, textColor, buttonText, buttonAction, isJoinButton = false, image = ''){
    return(
      <div key={title}>
        <div style={{background: `linear-gradient(${background}, ${background}), url(${image})`, backgroundSize: 'cover'}}>
          <div className="container" style={{padding: '20px'}}>
            <Row type="flex" style={{minHeight: '50vh', display:'flex'}}>
              <Col xs={24} sm={24} md={{span: 12, order: order}} lg={{span: 12, order: order}} xl={{span: 12, order: order}} style={{display:'flex'}}>
                <Row type="flex" justify="center" style={{margin:'auto'}}>
                  <Icon component={icon} style={{fontSize: '170px', color:textColor}}/>
                </Row>          
              </Col>      
              <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{display:'flex'}}>
                <Row type="flex" justify="center" style={{margin:'auto', padding: '20px', color: textColor}}>
                    <Row type="flex" justify="center">
                      <span style={{fontSize: '30px', marginTop: '10px', textAlign:'center'}}>
                        {this.props.t(title)}
                      </span>
                    </Row>                
                    <Row type="flex" justify="center">
                      <span align="center" style={{fontSize: '16px', marginTop: '10px'}}>
                        {this.props.t(description)}
                      </span>
                    </Row> 
                    <Row type="flex" justify="center">
                    {
                      isJoinButton && cookie.get(COOKIES.authorization) ? null :
                      <Button shape="round" size="large" style={{marginTop: '20px'}} onClick={buttonAction}>
                        {i18next.t(buttonText)}
                      </Button>
                    }

                    </Row> 
                </Row>          
              </Col>
            </Row>      
          </div>         
        </div>

       
      </div>
    )
  }
  
  render() {
    return (
      <div className=" default-background">
        <div>
          <Row>
              <SignUpContext.Consumer>
              {({visible, toggle}) => (  
                <div>
                  {
                    this.content.map((element, index) => {
                      return this.renderIntro(element.title, element.description,element.icon,index, element.background, element.order, element.textColor, element.buttonText, element.onButtonClick || toggle, element.isJoinButton, element.image);
                    })
                  } 
                </div>
              )}
            </SignUpContext.Consumer>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(ServicesSection));
