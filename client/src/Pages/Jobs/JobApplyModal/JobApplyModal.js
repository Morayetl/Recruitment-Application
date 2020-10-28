import React from 'react';
import { Form, Button, DatePicker, Modal, notification } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import axios from '../../../Utils/axios';
import { MAX_LENGTH, USER_ROLES, COOKIES } from '../../../Utils/constants';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookie from 'js-cookie';
import './JobApplyModal.css';
import { SignUpContext } from '../../../Shared/Modals/SignUpModal/SignUpContext';

const dateFormat = 'DD.MM.YYYY';

class JobApplyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      jobTypeOptions: [],
      qualificationOptions: [],
      careerLevelOptions: [],
      visible: false ,
      joinTodayModalvisible: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal = (toggle) => {
    const role = cookie.get(COOKIES.role);
    if(role === USER_ROLES.employee){
      this.setState({
        visible: true,
      });        
    }else{
      // if not registered show join today modal
      toggle();
    }
  };

  closeModal(){
    this.setState({
      joinTodayModalvisible: false,
    });    
  }

  componentDidMount() {

  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ...values,
          startDate: values.startDate.toDate()
        }
        
        axios.post('/jobs/job/apply/' + this.props.selectedJobId, data).then((res)=>{
          this.openSuccessNotification();
          this.props.form.resetFields();
          this.props.hasApplied(this.props.selectedJobId);
          this.setState({
            visible: false,
          });
        });
      } 
    });
  };

  openSuccessNotification = () => {
    notification['success']({
      message: i18next.t('jobs-page-search-result-tab-apply-modal-apply-success-message'),
      duration: 5,
      description:
        ''
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={{margin: '0 0 0 auto'}}>
        <SignUpContext.Consumer>
          {({toggleJoinToday}) => (
          <Button onClick={() => this.showModal(toggleJoinToday)} style={{backgroundColor: 'green', color:'white'}}>
            {this.props.t('jobs-page-search-result-tab-apply-modal-button')}
          </Button>          
          )}
        </SignUpContext.Consumer>  
        <Modal
        title={this.props.t('jobs-page-search-result-tab-apply-modal-title')}
        visible={this.state.visible}
        okText={this.props.t('jobs-page-search-result-tab-apply-modal-oktext')}
        onOk={this.handleSubmit}
        okButtonProps= {{style: {backgroundColor: 'green'}}}
        onCancel={() => this.setState({visible:false})}
        >
          <Form onSubmit={this.handleSubmit}>     
            <Form.Item label={this.props.t('jobs-page-search-result-tab-apply-modal-form-available')}>
              {getFieldDecorator('startDate', {
                initialValue: moment(),
                rules: [
                  { required: true, message: i18next.t('error-message-required') },
                ]
              })(
                <DatePicker size="large" style={{width: '100%'}}format={dateFormat} disabledDate={ (d) => d.isSameOrBefore(moment()) } />
              )}
            </Form.Item>
            <Form.Item label={this.props.t('jobs-page-search-result-tab-apply-modal-form-cover-letter')}>
              {getFieldDecorator('coverLetter', {
                rules: [
                  { required: true, message: i18next.t('error-message-required') },
                  {max: MAX_LENGTH.application.coverletter, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.application.coverletter,})}
                ]
              })(
                <TextArea rows={6} size="large"/>,
              )}
            </Form.Item>     
          </Form>      
        </Modal>
      </div>
    );
  }
}

export default Form.create({ name: 'apply_to_job' })(withTranslation()(JobApplyModal));