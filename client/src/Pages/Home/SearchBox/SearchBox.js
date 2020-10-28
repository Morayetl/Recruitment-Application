import React from 'react';
import './SearchBox.css';
import { Input, Icon, Button, Col, Row, Form } from 'antd';
import { withRouter } from "react-router";
import SearchLocation from '../../../Shared/Form-Items/SearchLocation/SearchLocation';
import { withTranslation } from 'react-i18next';

const style = {
  formItem: {
    width: '100%',
    height: '50px'
  },
  formItemContainer: {
    padding: '5px'
  },
  background: {
    borderRadius: '6px',
    background: 'rgba(192,192,192, 0.2)',
    padding: '10px',
    marginBottom: '20px'
  }
}

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      query:  ''
    };

    this.onSearch = this.onSearch.bind(this);
  }
  
  onSearch(event){
    event.preventDefault();
    let query = new URLSearchParams({query: encodeURIComponent(this.state.query), location:encodeURIComponent(this.state.location)}).toString();
    query = query ? '?' + query : '';
    this.props.history.push('/jobs' + query);
  }
  
  render() {
    return (
      <Form onSubmit={this.onSearch}>
        <Row style={style.background}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} style={style.formItemContainer}>
            <Input
                style={style.formItem}
                size="large"
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={this.props.t('home-page-searchbox-search-input-placeholder')}
                onChange={value => this.setState({query: value.target.value})}
                  /> 
          </Col>   
          <Col xs={24} sm={24} md={6} lg={6} xl={6} style={style.formItemContainer}>
            <SearchLocation onChange={value => this.setState({location: value})}>
              <Input
                style={style.formItem}
                size="large"
                prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={this.props.t('home-page-searchbox-location-input-placeholder')}
                  />                 
            </SearchLocation>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} style={style.formItemContainer}>
            <Button style={style.formItem} type="primary" block={true} size="large" htmlType="submit">
            {this.props.t('home-page-searchbox-search-button-text')}
            </Button>        
          </Col>
        </Row>
      </Form>

    );
  }
}

export default withTranslation()(withRouter(SearchBox));
