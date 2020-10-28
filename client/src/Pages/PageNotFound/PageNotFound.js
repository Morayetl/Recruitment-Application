import React from 'react';
import './PageNotFound.css';
import { Icon, Button } from 'antd';
import emptyHouse from '../../icons/empty-house.svg';
import { withRouter } from "react-router";
import i18next from 'i18next';

class PageNotFound extends React.Component {
  constructor(props) {
    super(props);

    this.onReturnButtonClick = this.onReturnButtonClick.bind(this);
  }

  componentDidMount(){
    document.title = i18next.t('page-not-found');
  }

  onReturnButtonClick(){
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div className="default-background" style={{width: '100%', height: '100%', display: 'flex', justifyContent:'center'}}>  
        <div style={{margin: 'auto', display: 'flex', flexDirection: 'column'}}>
          <div style={{margin: 'auto', width: '100%', display: 'flex'}}>
            <Icon component={emptyHouse} style={{fontSize: '120px', margin: 'auto'}}/>
          </div>
          <div style={{margin: 'auto', width: '100%'}}>
            <h1 style={{fontSize: '60px', marginBottom: 0, textAlign: 'center'}}>404</h1>          
          </div>
          <div style={{margin: 'auto', width: '100%'}}>
            <h1 style={{fontSize: '40px', marginBottom: 0, textAlign: 'center'}}>{i18next.t('page-not-found')}</h1>          
          </div>
          <div style={{margin: '20px auto auto auto', width: '100%', display: 'flex'}}>
            <Button onClick={this.onReturnButtonClick} type="primary" style={{fontSize: '30px', margin: 'auto', height: 'auto'}}>
              {i18next.t('return-to-front-page')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PageNotFound);
