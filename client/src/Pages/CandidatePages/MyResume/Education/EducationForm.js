import React from 'react';
import { Form, Input, notification, Select, DatePicker, Button, Row} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from '../../../../Utils/axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { setEducation } from '../../../../redux/actions/resume.actions';
import i18next from 'i18next';
import { MAX_LENGTH, DATE_FORMAT } from '../../../../Utils/constants';
import { getQualificationLevelOptions } from '../../../../Utils/codeset';
import { startDateBeforeEndDate } from '../../../../Shared/Validators/validators';

const { Option } = Select;

class EducationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      qualificationOptions: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mounted = true;
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
    getQualificationLevelOptions()
    .then((options) => {
      this.setState({qualificationOptions: options});
    });       

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
          axios.put('/resume/education/' + this.props.data._id, data).then((res)=>{
            this.props.dispatch(setEducation({education: res.data}));
            this.openSuccessNotification(i18next.t('my-resume-add-education-update-message'));
            this.props.closeModal();
          });
        }else{
          axios.post('/resume/education', data).then((res)=>{
            if(this.mounted) {
              this.props.dispatch(setEducation({education: res.data}));
              this.openSuccessNotification(i18next.t('my-resume-add-education-success-message'));
              this.props.form.resetFields();
              this.props.closeModal();
            }
          });
        }
      } 
    });
  };

  componentWillUnmount(){
    this.mounted = false;
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>         
        <Form.Item label={i18next.t('institute')}>
          {getFieldDecorator('schoolName', {
            initialValue: this.state.data.schoolName,
            rules: [
              { required: true, message: i18next.t('error-message-required-institute') },
              { max: MAX_LENGTH.resume.name, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.resume.name})}
            ],
          })(
            <Input size="large"/>,
          )}
        </Form.Item>  
        <Form.Item label={i18next.t('degree-name')}>
          {getFieldDecorator('degreeName',{
            initialValue: this.state.data.degreeName,
            rules:[
              { required: true, message: i18next.t('error-message-required-degree-name') },
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
        <Form.Item label={i18next.t('qualification-level')}>    
          {getFieldDecorator('qualificationLevel', {
            initialValue: this.state.data.qualificationLevel,
            rules: [
              { required: true, message: i18next.t('error-message-required-qualification-level') }
            ]
          })(
            <Select allowClear={true} size="large">
              {this.state.qualificationOptions.map( (value, index) => {
                return(<Option key={index} value={value.value}>{value.label}</Option>)
              })}
            </Select>
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
              {i18next.t('cancel')}
            </Button>         
            <Button size="large" style={{marginLeft:'10px'}} type="primary" htmlType="submit">
              {i18next.t('ok')}
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

const EducationFormRedux = connect(mapStateToProps)(EducationForm);
const WrappedEducationEditForm = Form.create({ name: 'education_form' })(EducationFormRedux);
export default WrappedEducationEditForm;
