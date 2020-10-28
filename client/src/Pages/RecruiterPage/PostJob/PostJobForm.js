import React from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import axios from '../../../Utils/axios';
import SearchCategory from '../../../Shared/Form-Items/SearchCategory/SearchCategory';
import SearchLocation from '../../../Shared/Form-Items/SearchLocation/SearchLocation';
import { getQualificationLevelOptions, getCareerLevelOptions, getJobTypeOptions } from '../../../Utils/codeset';


const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY';

class PostJobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      current: 'mail',
      state: {qualificationError: '', careerLevelError: ''},
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

    getQualificationLevelOptions()
    .then((options) => {
      this.setState({qualificationOptions: options});
    });

    getCareerLevelOptions()
    .then((options) => {
      this.setState({careerLevelOptions: options});
    });
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ...values,
          location: values.location.key,
          startDate: values.startDate[0].toDate().toISOString().split('T')[0],
          endDate: values.startDate[1].toDate().toISOString().split('T')[0]
        }
      
        axios.post('/jobs/job', data);
      } 
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>     
          <Form.Item label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please insert title!' }],
            })(
              <Input size="large"/>,
            )}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator('description', {
              rules: [
                { required: true, message: 'Please insert description!' },
                {max: 2000, message: 'Maximum amount of character is 2000.'}
              ]
            })(
              <TextArea rows={6} size="large"/>,
            )}
          </Form.Item>
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label="Category">    
                {getFieldDecorator('category')(
                  <SearchCategory size="large" multiple={false}></SearchCategory>
                )}     
              </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label="Job Type">    
                {getFieldDecorator('jobType', { rules: [
                  { required: true, message: 'Please insert job type!' }
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
          <Form.Item label="Url">
            {getFieldDecorator('url', {
              rules: [
                {type: 'url', message: "The url is incorrect."},
                {max: 100, message: 'Maximum amount of character is 100.'}
              ]
            })(
              <Input rows={6} size="large"/>,
            )}
          </Form.Item>          
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label="Qualification">    
                {getFieldDecorator('qualification')(
                  <Select allowClear={true} size="large">
                    {this.state.qualificationOptions.map( (value, index) => {
                      return(<Option key={index} value={value.value}>{value.label}</Option>)
                    })}
                  </Select>
                )}     
              </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label="Career Level">    
                {getFieldDecorator('careerLevel', { rules: [
                  { required: true, message: 'Please insert career level!' }
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
          <Form.Item label="Location">
            {getFieldDecorator('location', {
              rules: [{ required: true, message: 'Please input location!' }],
            })(<SearchLocation size="large"/>
            )}
          </Form.Item>     
          <Form.Item label="Address">
            {getFieldDecorator('address', {
              rules: [{ required: true, message: 'Please input address!' }],
            })(<Input size="large"/>
            )}
          </Form.Item>       
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label="Contact Person">    
                {getFieldDecorator('contactPerson', { rules: [
                  { required: true, message: 'Please insert contect person!' }
                ]
                })(
                  <Input size="large"/>
                )}     
              </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label="Phone number">    
                {getFieldDecorator('number', { rules: [
                  { required: true, message: 'Please insert phone number!' }
                ]
                })(
                  <Input size="large"/>
                )}     
              </Form.Item>           
            </Col>           
          </Row>
          <Form.Item label="Email">
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please insert title!' },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ]
            })(
              <Input size="large"/>,
            )}
          </Form.Item>                            
          <Form.Item label="Post date range">
            {getFieldDecorator('startDate', {
              initialValue:[moment(), moment().add(30, 'days')],
              rules: [{ required: true, message: 'Please input dates!' }],
            })(<RangePicker style={{ width: '100%' }} format={dateFormat} allowClear={false} size="large"/>
            )}
          </Form.Item>             
          <Form.Item label="Tags">
            {getFieldDecorator('tags')(
              <Select mode="tags" size="large" style={{ width: '100%' }} placeholder="Tags Mode">
              </Select>,
            )}
          </Form.Item>  
          <Form.Item >
            <Button size="large" style={{marginRight:'0px', marginLeft: 'auto', display:'block'}} type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>  
        </Form>      
      </div>
    );
  }
}

const WrappedPostJobForm = Form.create({ name: 'post_job' })(PostJobForm);
export default WrappedPostJobForm;
