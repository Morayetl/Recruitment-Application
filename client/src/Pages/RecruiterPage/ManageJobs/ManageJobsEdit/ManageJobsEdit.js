import React from 'react';
import { Form, Input, Button, Row, Col, Select, notification} from 'antd';
import SearchLocation from '../../../../Shared/Form-Items/SearchLocation/SearchLocation';
import SearchCategory from '../../../../Shared/Form-Items/SearchCategory/SearchCategory';
import axios from '../../../../Utils/axios';
import { getCareerLevelOptions, getQualificationLevelOptions, getJobTypeOptions } from '../../../../Utils/codeset';
import { withTranslation } from 'react-i18next';
import { MAX_LENGTH } from '../../../../Utils/constants';
import { urlValidator } from '../../../../Shared/Validators/validators';
import QuillRichTextEditor from '../../../../Shared/Form-Items/QuillRichTextEditor/QuillRichTextEditor';
import i18next from 'i18next';


const { Option } = Select;

class ManageJobsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      result: {},
      jobTypeOptions: [],
      qualificationOptions: [],
      careerLevelOptions: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getJobTypeOptions()
    .then((options) => {
      this.setState({jobTypeOptions: options});
    });

    getCareerLevelOptions()
    .then((options) => {
      this.setState({careerLevelOptions: options});
    });    

    getQualificationLevelOptions()
    .then((options) => {
      this.setState({qualificationOptions: options});
    });
  }

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('data' in nextProps) {
      return {
        data: nextProps.data || null
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.data && prevState.data && JSON.stringify(this.props.data) !== JSON.stringify(prevState.data)){
      this.props.form.resetFields();
      setTimeout(function(){
        this.setState({data: this.props.data})
      }.bind(this));
    }
  }

  handleSubmit(e){
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ...values
        }

        axios.post('/jobs/job/employer/' + this.props.data._id, data).then((res)=>{
          this.props.updateJobList();
          this.openSuccessNotification();
          this.setState({
            visible: false,
          });
          this.props.closeModal();
          this.props.form.resetFields();
        });
      } 
    });
  };

  openSuccessNotification = () => {
    notification['success']({
      message: i18next.t('manage-jobs-edit-success'),
      duration: 5,
      description:
        ''
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>     
          <Form.Item label={this.props.t('title')}>
            {getFieldDecorator('title', {
              initialValue: this.state.data.title,
              rules: [
                { required: true, message: this.props.t('error-message-required-title') },
                {max: MAX_LENGTH.job.title, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.job.title})}
              ],
            })(
              <Input size="large"/>,
            )}
          </Form.Item>
          <Form.Item label={this.props.t('description')}>
            {getFieldDecorator('description', {
              initialValue: this.state.data.description,
              rules: [
                { required: true, message: this.props.t('error-message-required-description') },
                {max: MAX_LENGTH.job.description, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.job.description})}
              ]
            })(
              <QuillRichTextEditor/>,
            )}
          </Form.Item>
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label={this.props.t('category')}>    
                {getFieldDecorator('category',{
                  initialValue: this.state.data.category,
                  rules:[
                    {required: true, message: this.props.t('error-message-required-category')}
                  ]
                })(
                  <SearchCategory size="large" selectOnlyLeafs></SearchCategory>
                )}     
              </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label={this.props.t('job-type')}>    
                {getFieldDecorator('jobType', { 
                  initialValue: this.state.data.jobType,
                  rules: [
                  { required: true, message: this.props.t('error-message-required-job-type') }
                ]
                })(
                  <Select allowClear={true} size="large">
                    {this.state.jobTypeOptions.map( (value, index) => {
                      return(<Option key={index} value={value.value}>{value.label}</Option>)
                    })}
                  </Select>
                )}     
              </Form.Item>           
            </Col>           
          </Row>           
          <Form.Item label={this.props.t('website')}>
            {getFieldDecorator('url', {
              initialValue: this.state.data.url,
              rules: [
                {max: MAX_LENGTH.url, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.url})},
                {validator: urlValidator}
              ]
            })(
              <Input rows={6} size="large"/>,
            )}
          </Form.Item>          
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label={this.props.t('qualification')}>    
                {getFieldDecorator('qualification',{
                  initialValue: this.state.data.qualification,
                })(
                  <Select allowClear={true} size="large">
                    {this.state.qualificationOptions.map( (value, index) => {
                      return(<Option key={index} value={value.value}>{value.label}</Option>)
                    })}
                  </Select>
                )}     
              </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label={this.props.t('career-level')}>    
                {getFieldDecorator('careerLevel', { 
                  initialValue: this.state.data.careerLevel,
                  rules: [
                  { required: true, message: this.props.t('error-message-required-career-level') }
                ]
                })(
                  <Select allowClear={true} size="large">
                    {this.state.careerLevelOptions.map( (value, index) => {
                      return(<Option key={index} value={value.value}>{value.label}</Option>)
                    })}
                  </Select>
                )}     
              </Form.Item>           
            </Col>           
          </Row>                      
          <Form.Item label={this.props.t('location')}>
            {getFieldDecorator('location', {
              initialValue: this.state.data.location,
              rules: [{ required: true, message: this.props.t('error-message-required-location') }],
            })(<SearchLocation size="large"/>
            )}
          </Form.Item>     
          <Form.Item label={this.props.t('address')}>
            {getFieldDecorator('address', {
              initialValue: this.state.data.address,
              rules: [
                { required: true, message: this.props.t('error-message-required-address') },
                {max: MAX_LENGTH.address, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.address})}
              ],
            })(<Input size="large"/>
            )}
          </Form.Item>       
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label={this.props.t('contact-person')}>    
                {getFieldDecorator('contactPerson', { 
                  initialValue: this.state.data.contactPerson,
                  rules: [
                  { required: true, message: this.props.t('error-message-required-contact-person') },
                  {max: MAX_LENGTH.job.name, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.job.name})}
                ]
                })(
                  <Input size="large"/>
                )}     
              </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label={this.props.t('phone-number')}>    
                {getFieldDecorator('phoneNumber', { 
                  initialValue: this.state.data.phoneNumber,
                  rules: [
                  { required: true, message: this.props.t('error-message-required-phone-number') },
                  {max: MAX_LENGTH.phoneNumber, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.phoneNumber})}
                ]
                })(
                  <Input size="large"/>
                )}     
              </Form.Item>           
            </Col>           
          </Row>
          <Form.Item label={this.props.t('email')}>
            {getFieldDecorator('email', {
              initialValue: this.state.data.email,
              rules: [
                { required: true, message: this.props.t('error-message-required-email') },
                {
                  type: 'email',
                  message: this.props.t('error-message-invalid-email'),
                },
                {max: MAX_LENGTH.email, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.email})}
              ]
            })(
              <Input size="large"/>,
            )}
          </Form.Item>                                     
          <Form.Item label={this.props.t('tags')}>
            {getFieldDecorator('tags', {
              initialValue: this.state.data.tags,
            })(
              <Select mode="tags" size="large" style={{ width: '100%' }} placeholder="Tags Mode">
              </Select>,
            )}
          </Form.Item>
        </Form>      
        <Row type="flex" justify="end">
          <Button type="primary" style={{marginRight: '10px'}} onClick={()=>this.props.closeModal()}>
            {i18next.t('cancel')}
          </Button>
          <Button onClick={this.handleSubmit}>
            {i18next.t('ok')}
          </Button>
        </Row>
      </div>
    );
  }
}

const ManageJobsEditModal = withTranslation()(Form.create({ name: 'edit_job' })(ManageJobsEdit));
export default ManageJobsEditModal;
