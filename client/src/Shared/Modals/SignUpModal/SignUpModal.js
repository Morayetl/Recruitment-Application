import React from 'react';
import { Button, Modal, Row, Icon, Alert } from 'antd';
import WrappedSignUpRecruiterForm from './SignUpRecruiterForm';
import WrappedSignUpRegisterJobSeekerForm from './SignUpJobSeekerForm';
import i18next from 'i18next';
import logo from '../../../icons/logo2.svg';
import { SignUpContext } from './SignUpContext';

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isJobSeeker: true
    };
    this.closeModal = this.closeModal.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  closeModal = () => {
    this.setState({
      visible: false,
    });
  }

  componentDidMount() {
    /* implement api that gets employers active jobs
    axios.get('/codeset',{params: {type: 'jobType'}})
    .then((res) => {
      const options = res.data.map(value => {
        return { 
          value: value.value,
          label: value.en
        }
      });
      this.setState({jobTypeOptions: options});
    });*/
  }

  render() {
    return (
      <div id="sign-up-modal">
        <SignUpContext.Consumer>
        {({visible, toggle, joinToday}) => (
          <div>
            <div className="sign-up-modal-button" onClick={toggle}>
              {i18next.t('sign-up')}
            </div>             

            <Modal
            visible={visible}
            onCancel={toggle}
            footer= {null}
            width="800px"
            bodyStyle={{padding: '0px'}}
            className="sign-up-modal"
            >    
              <Row className="sign-up-modal-header" type="flex">
                <Row style={{margin: 'auto'}}>
                  <Row type="flex" justify="center">
                    <Icon component={logo} style={{fontSize: '70px'}}/>
                  </Row>
                  {
                    joinToday ? 
                    (
                      <div>
                        <Row type="flex" justify="center">
                          <span>
                          {i18next.t('join-today-modal-title-1')}
                          </span>
                        </Row>
                        <Row type="flex" justify="center">
                          <h1>
                            {i18next.t('join-today-modal-title-2')}
                          </h1>
                        </Row>   
                      </div>
                    ):
                    (
                      <Row type="flex" justify="center">
                        <h1>
                          {i18next.t('sign-up')}
                        </h1>
                      </Row>
                    )
                  }
                </Row>
              </Row>      
              <div style={{padding: '24px 24px 0px 24px'}}>
                <Alert message={i18next.t('sign-up-info')} type="info" showIcon />              
              </div>     
              <Row type="flex" justify="center" style={{padding: '24px 24px 10px 24px'}}>
                <Button type={this.state.isJobSeeker ? 'primary' : ''} onClick={()=> {this.setState({isJobSeeker: true})}} style={{marginRight: '4px'}}>
                  {i18next.t('sign-up-modal-job-seeker')}
                </Button>
                <Button type={!this.state.isJobSeeker ? 'primary' : ''} onClick={()=> {this.setState({isJobSeeker: false})}} style={{marginRight: '4px'}}>
                  {i18next.t('sign-up-modal-recruiter')}
                </Button>      
              </Row>
              <div style={{padding: '0px 24px 24px 24px'}}>
                {
                  this.state.isJobSeeker ? <WrappedSignUpRegisterJobSeekerForm/> : <WrappedSignUpRecruiterForm/>
                }          
              </div>
            </Modal>            
          </div>

        )}
        </SignUpContext.Consumer>

      </div>
    );
  }
}

export default SignUpModal;