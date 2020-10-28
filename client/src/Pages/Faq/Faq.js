import React from 'react';
import './Faq.css';
import { Row } from 'antd';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';
import i18next from 'i18next';
import { SUPPORT_EMAIL, APP_NAME, ADDRESS, APP_PHONENUMBER, APP_COMPANY_ID } from '../../Utils/constants';
import {Helmet} from "react-helmet";


const faq = [
  {
    question: 'faq-question-1',
    answer: 'faq-answer-1'
  },
  {
    question: 'faq-question-2',
    answer: 'faq-answer-2'
  },
  {
    question: 'faq-question-3',
    answer: 'faq-answer-3'
  },  
  {
    question: 'faq-question-4',
    answer: 'faq-answer-4'
  },
];

class Faq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail'
    };
  }

  getFaq({question, answer }, key){
    return(
      <Row key={key} className="default-background faq-page-item" style={{marginBottom: '20px'}}>
        <div>
          <h2 style={{overflowWrap: 'break-word'}}>
            { i18next.t(question) }
          </h2>            
        </div>
        <div>
          <p style={{color: 'grey', overflowWrap: 'break-word'}} dangerouslySetInnerHTML={{__html: i18next.t(answer, {interpolation: {escapeValue: false}})}}>
          </p>            
        </div>
      </Row>
    )
  }
  
  render() {
    return (
      <div className="faq-page">
        <div className="default-header">
          <Header></Header>
        </div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${i18next.t('faq-title')}`}</title>
          <meta name="title" content={`${APP_NAME} - ${i18next.t('faq-title')}`}></meta>
          <meta name="description" content={i18next.t('faq-title')}></meta>

          <meta property='og:title' content={`${APP_NAME} - ${i18next.t('faq-title')}`}/>
          <meta property="og:description" content={i18next.t('faq-title')}/>
          <meta property="og:url" content={window.location.href} />

          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:site" content={window.location.href} />
          <meta name="twitter:title" content={`${APP_NAME} - ${i18next.t('faq-title')}`}/>
          <meta name="twitter:description" content={i18next.t('faq-title')}/>                  
        </Helmet> 
        <div style={{background: 'white)', display:'flex', flex: '1 1 auto', height: 'auto' }}>
          <div className="container" style={{padding:'20px', background: 'white'}}>
            <Row style={{marginBottom: '20px'}} justify="start" type="flex">
              <h1> {i18next.t('faq-title')}</h1>
            </Row>  
            {
              faq.map((value, index) =>{
                return(
                  this.getFaq(value,index)
                )
              })
            }
            <Row>
              <span style={{color: 'grey'}}>
                {i18next.t('faq-more-questions') + " "}
              </span>
              <a href={'mailto:'+ SUPPORT_EMAIL}>
                {i18next.t('contact-us')}              
              </a>
            </Row>
            <Row style={{marginTop: '50px'}}>
              <div style={{marginBottom: '10px', fontWeight: 'bold'}}>
                { i18next.t('contact') }
              </div>
              <div>
                {APP_NAME}
              </div>
              <div>
                {ADDRESS}
              </div>
              <div>
                {APP_PHONENUMBER}
              </div>
              <div>
                {APP_COMPANY_ID}
              </div>
              <br/>
            </Row>
          </div>        
        </div>

        <Footer/>
      </div>
    );
  }
}

export default Faq;
