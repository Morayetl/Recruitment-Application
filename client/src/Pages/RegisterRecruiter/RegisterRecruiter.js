import React from 'react';
import './RegisterRecruiter.css';
import RegisterRecruiterForm from './RegisterRecruiterForm';
import { Row, Col, Button } from 'antd';
import Header from '../../Shared/Header/Header';
import RegisterRecruiterText from './RegisterRecruiterText';

class RegisterRecruiter extends React.Component {

  render() {
    return (
      <div>
        <div className="register-recruiter-page">
          <div>
            <Header></Header>
          </div>
          <div className="register-recruiter-page-jumbotron" style={{margin: 'auto'}}>
            <Row>
              <Row type="flex" justify="center" align="middle" >
                <h1 style={{margin: 0}}>
                  Lorem ipsum dolor sit amet
                </h1>              
              </Row>
              <Row type="flex" justify="center" align="middle" >
                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                  <p align="center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In faucibus tristique urna id consequat. Nam bibendum lorem eros, eu sodales velit condimentum et.
                  </p>                  
                </Col>
              </Row>
              <Row type="flex" justify="center" align="middle" >
                <Button>
                  Register now!
                </Button>
              </Row>
            </Row>            
          </div>
        </div>
        <div className="container" style={{marginTop:'50px', marginBottom: '50px'}}>
          <div>
            <Row type="flex" justify="center">
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <RegisterRecruiterText></RegisterRecruiterText>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <RegisterRecruiterForm/>
              </Col>
            </Row>
          </div>  
        </div>
      </div>

                 
      
    );
  }
}

export default RegisterRecruiter;
