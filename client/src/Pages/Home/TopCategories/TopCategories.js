import React from 'react';
import './TopCategories.css';
import { Link } from 'react-router-dom'
import { Icon, Col, Row } from 'antd';
import ItIcon from '../../../icons/information-technology.svg';
import businessIcon from '../../../icons/graph.svg';
import logisticsIcon from '../../../icons/shipping-and-delivery.svg';
import retailIcon from '../../../icons/retail.svg';
import { TOP_CATEGORIES } from '../../../Utils/constants';
import {Transition} from 'react-spring/renderprops';
import * as easings from 'd3-ease'
import { withTranslation } from 'react-i18next';

const style = {
  formItem: {
    width: '100%',
    height: '50px'
  },
  formItemContainer: {

  },
  background: {
    borderRadius: '6px',
    background: 'rgba(192,192,192, 0.2)',
    padding: '10px',
    marginBottom: '20px'
  }
}

class TopCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail'
    };
  }
  
  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  componentDidMount(){
    this.setState({animateCategories: true});
  }

  renderCategoryBlock(text, path, icon, delay = 1){
    return(
      <Transition
        items={{show: this.state.animateCategories}}
        from={{ opacity: 0 , transform: 'scale(0)'}}
        enter={{ opacity: 1, transform: 'scale(1)'}}
        leave={{ opacity: 1, transform: 'scale(1)'}}
        config={{
          duration: 1500,
          delay: 200 * delay,
          easing: easings.easePoly
        }}
      >
      {show => show && (props =>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} style={{...style.formItemContainer, ...props}}>
          <Link to={path}>
            <div className="top-categories-item">
              <div style={{margin: 'auto'}}>
                <Row type="flex" justify="center">
                  <Icon component={icon} style={{fontSize: '80px'}}/>
                </Row>
                <Row type="flex" justify="center">
                  <span style={{marginTop: '10px'}}>
                    {this.props.t(text)}
                  </span>
                </Row>                
              </div>
            </div>
          </Link>
        </Col>  
      )}       
      </Transition>
    );
  }
  
  render() {
    return (
      <div style={{padding: '25px 0 25px 0'}}>
        <Row>
          { this.renderCategoryBlock('home-page-top-categories-button-1-text','/jobs?categoryId=' + TOP_CATEGORIES.informationTechnology, ItIcon, 1) }
          { this.renderCategoryBlock('home-page-top-categories-button-2-text','/jobs?categoryId=' + TOP_CATEGORIES.business, businessIcon, 2) }
          { this.renderCategoryBlock('home-page-top-categories-button-3-text','/jobs?categoryId=' + TOP_CATEGORIES.logistics, logisticsIcon, 3) }
          { this.renderCategoryBlock('home-page-top-categories-button-4-text','/jobs?categoryId=' + TOP_CATEGORIES.retail, retailIcon, 4) }
        </Row>      
      </div>
    );
  }
}

export default withTranslation()(TopCategories);
