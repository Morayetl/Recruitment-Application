import React from 'react';
import { Form, Input, notification, DatePicker, Button, Row} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from '../../../../Utils/axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { setWorkExperience } from '../../../../redux/actions/resume.actions';
import i18next from 'i18next';
import { MAX_LENGTH, DATE_FORMAT } from '../../../../Utils/constants';
import { startDateBeforeEndDate } from '../../../../Shared/Validators/validators';


class WorkExperienceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      qualificationOptions: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openSuccessNotification = (message) => {
    notification['success']({
      message: message,
      duration: 5,
      description:
        ''
    });
  };

  openFailedNotification = () => {
    notification['success']({
      message: 'Profile has been successfully updated!',
      duration: 5,
      description:
        ''
    });
  };

  componentDidMount() {
    if(this.props.data){
      const data = {
        ...this.props.data,
        startDate: moment(this.props.data.startDate),
        endDate:   this.props.data.endDate ? moment(this.props.data.endDate ) : null
      }

      this.setState({data: data})
    }
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ...values,
          startDate: values.startDate.toDate().toISOString().split('T')[0],
        }

        if(data.endDate){
          data.endDate = values.endDate.toDate().toISOString().split('T')[0];
        }

        // if data exists update item
        if(this.props.data){
          axios.put('/resume/work-experience/' + this.props.data._id, data).then((res)=>{
            this.props.dispatch(setWorkExperience({workExperience: res.data}));
            this.openSuccessNotification(i18next.t('my-resume-add-work-experience-update-message'));
            this.props.closeModal();
          });
        }else{
          axios.post('/resume/work-experience', data).then((res)=>{
            this.props.dispatch(setWorkExperience({workExperience: res.data}));
            this.openSuccessNotification(i18next.t('my-resume-add-work-experience-success-message'));
            this.props.form.resetFields();
            this.props.closeModal();
          });
        }
      } 
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>         
        <Form.Item label={i18next.t('job-title')}>
          {getFieldDecorator('title', {
            initialValue: this.state.data.title,
            rules: [
              { required: true, message: i18next.t('error-message-required-job-title') },
              { max: MAX_LENGTH.resume.name, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.resume.name})}
          ],
          })(
            <Input size="large"/>,
          )}
        </Form.Item>  
        <Form.Item label={i18next.t('company-name')}>
          {getFieldDecorator('companyName',{
            initialValue: this.state.data.companyName,
            rules: [
              { required: true, message: i18next.t('error-message-required-company-name') },
              { max: MAX_LENGTH.resume.name, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.resume.name})}
            ]
          })(
            <Input size="large"/>,
          )}
        </Form.Item>           
        <Form.Item label={i18next.t('from')}>
          {getFieldDecorator('startDate', {
            initialValue: this.state.data.startDate,
            rules: [{ required: true, message: i18next.t('error-message-required-date') }],
          })(<DatePicker style={{ width: '100%' }} format={DATE_FORMAT} allowClear={false} size="large" disabledDate={d => d.isSameOrAfter(moment())}/>
          )}
        </Form.Item>              
        <Form.Item label={i18next.t('to')}>
          {getFieldDecorator('endDate',{
            initialValue: this.state.data.endDate,
            rules: [
              {
                validator: startDateBeforeEndDate(this.props.form)
              }
            ]
          })
          (<DatePicker style={{ width: '100%' }} format={DATE_FORMAT} allowClear={false} size="large" disabledDate={d => d.isSameOrAfter(moment())}/>
          )}
        </Form.Item>                            
        <Form.Item label={i18next.t('description')}>
          {getFieldDecorator('description', {
            initialValue: this.state.data.description,
            rules: [
              { max: MAX_LENGTH.resume.description, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.resume.description})}
            ]
          })(
            <TextArea rows={6} size="large"/>,
          )}
        </Form.Item>  
        <Form.Item >
          <Row type="flex" justify="end">
            <Button size="large" onClick={this.props.closeModal}>
              Cancel
            </Button>         
            <Button size="large" style={{marginLeft:'10px'}} type="primary" htmlType="submit">
              Ok
            </Button>   
          </Row>
        </Form.Item>                                       
      </Form>        
    );
  }
}

const mapStateToProps = state => {
  const { resumeReducer } = state;
  const {
    education
  } = resumeReducer;

  return {
    education
  };
}

const WorkExperienceFormRedux = connect(mapStateToProps)(WorkExperienceForm);
const WrappedWorkExperienceForm = Form.create({ name: 'education_form' })(WorkExperienceFormRedux);
export default WrappedWorkExperienceForm;
