import React from 'react';
import './Products.css';
import { Row, Card, Col, Button } from 'antd';
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import { SignUpContext } from '../../Shared/Modals/SignUpModal/SignUpContext';

class ProductsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: this.props.title.toLowerCase()
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.history.push('/products/buy/'+this.props.title.toLowerCase())
  }
  
  render() {
    return (
      <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}}>
        <Card  className={"card " + this.state.buttonColor }>
          <div className="card-header">
            <h1 style={{fontSize: '22px', textAlign: 'center', marginBottom: 0}}>
              {this.props.title}
            </h1>
            <Row type="flex" justify="center">
              <h2 style={{fontSize: '50px', marginBottom: 0}}>
                {this.props.data.price | 0}
              </h2>
              <h2 style={{alignSelf: 'center', marginBottom: '-15px' }}>
                €
              </h2>
            </Row>
            <Row type="flex" justify="center">
              <h4>
                {this.props.t('pricing-and-plans-days',{amount:this.props.data.jobDuration |0 })}
              </h4>
            </Row>
          </div>
          <Row>
            <Row style={{margin: '20px 0 20px 0'}} type="flex" justify="center">
              <span style={{textAlign: 'center'}}>{this.props.t('pricing-and-plans-posting',{amount:this.props.data.amountOfPost | 1})}</span>
            </Row>
            {
              this.props.data.amountOfFeaturedJob ? 
                <Row style={{margin: '20px 0 20px 0'}} type="flex" justify="center">
                  <span style={{textAlign: 'center'}}>{this.props.t('pricing-and-plans-featured',{amount:this.props.data.amountOfFeaturedJob | 0})}</span>
                </Row> : null     
            }

            <Row style={{margin: '20px 0 20px 0'}} type="flex" justify="center">
              <span style={{textAlign: 'center'}}>{this.props.t('pricing-and-plans-globally-visible')} </span>
            </Row>

            <Row style={{margin: '20px 0 20px 0'}} type="flex" justify="center">
              <span style={{textAlign: 'center'}}>{this.props.t('pricing-and-plans-display',{amount:this.props.data.jobDuration | 0})} </span>
            </Row>
            <Row style={{margin: '20px 0 30px 0'}} type="flex" justify="center">
              <span style={{textAlign: 'center'}}>{this.props.t('pricing-and-plans-valid',{amount:this.props.data.expireTime | 0})} </span>
            </Row>
            <Row style={{margin: '20px 0 10px 0'}} type="flex" justify="center">
              <SignUpContext.Consumer>
                {({visible, toggle}) => (  
                  <Button className={this.state.buttonColor}  onClick={toggle} size="large" >{this.props.t('home-page-services-section-join-button')}</Button>                
                )}
              </SignUpContext.Consumer>
            </Row>
          </Row>
        </Card>
      </Col>
    );
  }
}

export default withTranslation()(withRouter(ProductsCard));
