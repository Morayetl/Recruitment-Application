import React from 'react';
import './Products.css';
import Header from '../../Shared/Header/Header';
import { Row } from 'antd';
import ProductsCard from './ProductsCard';
import axios from '../../Utils/axios';
import i18next from 'i18next';
import Footer from '../../Shared/Footer/Footer';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {
        bronze: {},
        silver: {},
        gold:   {},
        free:   {},
        single: {}
      }
    };
  }

  componentDidMount(){
    axios.get('/products').then(res=>{
      this.setState({result: res.data})
    })
  }
  
  render() {
    return (
      <div className="flex-page default-background product-page" style={{minHeight: '100%'}}>
        <div className="default-header" style={{background: 'white'}}>
          <Header/>   
        </div>
        <div className="container" style={{display: 'flex', flexDirection: 'column', flex: '1 1'}}>
          <Row type="flex" justify="center">
            <h1 style={{textAlign: 'center', fontWeight:'bold', marginBottom: 0, marginTop: '20px'}}>
              {i18next.t('pricing-and-plans-title1')}
            </h1>
          </Row>
          <Row type="flex" justify="center" style={{margin: '20px 15px 20px 15px'}}>
            <span style={{textAlign: 'center', marginBottom: 0, fontWeight: 'bold', width: '600px'}}>
              {i18next.t('pricing-and-plans-join-today', { jobPost: this.state.result.free.amountOfPost, duration: this.state.result.free.jobDuration})}
            </span>
          </Row>          
          <Row type="flex" style={{marginTop: '20px'}}>
            <ProductsCard data={this.state.result.free} title={i18next.t('free')}/>
            <ProductsCard data={this.state.result.single} title={i18next.t('single')}/>
          </Row>
        </div>             

        <Footer/>
      </div>
    );
  }
}

export default Products;
