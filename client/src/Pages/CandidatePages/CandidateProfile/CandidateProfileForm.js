import React from 'react';
import { Form, Input, Button, Row, Col, Select, Icon, notification, DatePicker} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from '../../../Utils/axios';
import SearchLocation from '../../../Shared/Form-Items/SearchLocation/SearchLocation';
import { urlMatching, urlValidator, validatePhoneNumber } from '../../../Shared/Validators/validators';
import i18next from 'i18next';
import { MAX_LENGTH, DATE_FORMAT } from '../../../Utils/constants';
import moment from 'moment';

class CandidateProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languageOptions: [],
      qualificationOptions: [],
      initialValue: {
        userProfile: {
          urls: {}
        }
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/codeset',{params: {type: 'companySize'}})
    .then((res) => {
      const options = res.data.map(value => {
        return { 
          value: value.value,
          label: value.en
        }
      });
      this.setState({languageOptions: options});
    });

    axios.get('/codeset',{params: {type: 'qualificationLevel'}})
    .then((res) => {
      const options = res.data.map(value => {
        return { 
          value: value.value,
          label: value.en
        }
      });
      this.setState({qualificationOptions: options});
    });   
    
    axios.post('/user')
    .then((res) => {
      const data = {
        ...res.data
      }

      if(data.userProfile.birthday){
        data.userProfile.birthday = moment(data.userProfile.birthday);
      }

      if(!data.userProfile.urls){
        data.userProfile.urls = {}
      }
      this.setState({initialValue: data});
    });  
  }

  openNotification = () => {
    notification['success']({
      message: i18next.t('candidate-profile-update-success-message'),
      duration: 5,
      description:
        ''
    });
  };
    
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ...values
        }
        axios.put('/user', data).then(()=>{
          this.openNotification();
        });
      } 
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <Form onSubmit={this.handleSubmit}>     
          <Form.Item label={i18next.t('job-title')}>    
            {getFieldDecorator('userProfile.jobTitle', { 
              initialValue: this.state.initialValue.userProfile.jobTitle,
              rules: [
                //{ required: true, message: i18next.t('error-message-required-job-title') },
                { max: MAX_LENGTH.employee.jobTitle, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.employee.jobTitle})}
              ]
            })(
              <Input size="large"/>
            )}     
          </Form.Item>                           
          <Form.Item label={i18next.t('description')}>
            {getFieldDecorator('userProfile.description', {
              initialValue: this.state.initialValue.userProfile.description,
              rules: [
                //{ required: true, message: i18next.t('error-message-required-description') },
                { max: MAX_LENGTH.employee.description, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.employee.description})}
              ]
            })(
              <TextArea rows={6} size="large"/>,
            )}
          </Form.Item>      
          <div style={{margin: '30px 0px 20px', borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
              <h2>
                {i18next.t('socials')}
              </h2>
          </div>    
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label="Facebook">    
                {getFieldDecorator('userProfile.urls.facebookPageUrl', {
                  initialValue: this.state.initialValue.userProfile.urls.facebookPageUrl, 
                  rules: [
                    {validator: urlMatching('facebook')},
                    { max: MAX_LENGTH.url, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.url})}
                  ]
                })(
                  <Input size="large" suffix={ <Icon type="facebook"/>} />
                )}     
              </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label="Twitter">    
                {getFieldDecorator('userProfile.urls.twitterPageUrl', { 
                  initialValue: this.state.initialValue.userProfile.urls.twitterPageUrl,
                  rules: [
                    { max: MAX_LENGTH.url, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.url})},
                    {validator: urlMatching('twitter')}
                  ]
                })(
                  <Input size="large" suffix={ <Icon type="twitter"/>} />
                )}     
              </Form.Item>           
            </Col>           
          </Row>
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label="Google">    
                {getFieldDecorator('userProfile.urls.googlePageUrl', { 
                  initialValue: this.state.initialValue.userProfile.urls.googlePageUrl,
                  rules: [
                    { max: MAX_LENGTH.url, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.url})},
                    {validator: urlMatching('google')}
                  ]
                })(
                  <Input size="large" suffix={ <Icon type="google"/>} />
                )}     
              </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label="Linkedin">    
                {getFieldDecorator('userProfile.urls.linkedinPageUrl', { 
                  initialValue: this.state.initialValue.userProfile.urls.linkedinPageUrl,
                  rules: [
                    { max: MAX_LENGTH.url, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.url})},
                    {validator: urlMatching('linkedin')}
                  ]
                })(
                  <Input size="large" suffix={ <Icon type="linkedin"/>} />
                )}     
              </Form.Item>           
            </Col>           
          </Row>    
          <Row>
            <Form.Item label="Github">    
              {getFieldDecorator('userProfile.urls.githubPageUrl', { 
                initialValue:this.state.initialValue.githubPageUrl,
                rules: [
                  {validator: urlMatching('github')},
                  {max: MAX_LENGTH.url, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.url})}
                ]
              })(
                <Input size="large" suffix={ <Icon type="github"/>} />
              )}     
            </Form.Item>  
          </Row>
          <div style={{margin: '30px 0px 20px', borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
              <h2>
                {i18next.t('contact')}
              </h2>
          </div>                                
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label={i18next.t('first-name')}>
                {getFieldDecorator('userProfile.firstname', {
                  initialValue: this.state.initialValue.userProfile.firstname,
                  rules: [
                    { required: true, message: i18next.t('error-message-required-first-name') },
                    { max: MAX_LENGTH.name, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.name})}
                  ]
                })(
                  <Input size="large"/>,
                )}
            </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label={i18next.t('last-name')}>    
                {getFieldDecorator('userProfile.lastname', { 
                  initialValue: this.state.initialValue.userProfile.lastname,
                  rules: [
                  { required: true, message: i18next.t('error-message-required-last-name') },
                  { max: MAX_LENGTH.name, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.name})}
                ]
                })(
                  <Input size="large"/>
                )}     
              </Form.Item>           
            </Col>           
          </Row>        
          <Form.Item label={i18next.t('birthday')}>
              {getFieldDecorator('userProfile.birthday', {
                initialValue: this.state.initialValue.userProfile.birthday,
                rules: [
                  { required: true, message: i18next.t('error-message-required-birthday') },
                ]
              })(<DatePicker size="large" style={{width: '100%'}} format={DATE_FORMAT} defaultPickerValue={moment().subtract(18,'year')} disabledDate={d => d.isAfter(moment().subtract(18,'year'))}/>)}
          </Form.Item>          
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label={i18next.t('email')}>
                {getFieldDecorator('email', {
                  initialValue: this.state.initialValue.email,
                  rules: [
                    { required: true, message: i18next.t('error-message-required-email') },
                    {
                      type: 'email',
                      message: i18next.t('error-message-invalid-email'),
                    },
                    { max: MAX_LENGTH.email, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.email})}
                  ]
                })(
                  <Input size="large" disabled={true}/>,
                )}
            </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label={i18next.t('phone-number')}>    
                {getFieldDecorator('userProfile.number', { 
                  initialValue: this.state.initialValue.userProfile.number,
                  rules: [
                    { max: MAX_LENGTH.phoneNumber, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.phoneNumber})},
                    { required: true, message: i18next.t('error-message-required-phone-number') },
                    { validator: validatePhoneNumber}
                ]
                })(
                  <Input placeholder={i18next.t('phone-number-placeholder')} size="large"/>
                )}     
              </Form.Item>           
            </Col>           
          </Row> 
          <Form.Item label={i18next.t('website')}>
            {getFieldDecorator('userProfile.urls.homePageUrl', {
              initialValue: this.state.initialValue.userProfile.urls.homePageUrl, 
              rules: [
                { max: MAX_LENGTH.url, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.url})},
                {validator: urlValidator}
              ]
            })(
              <Input rows={6} size="large"/>,
            )}
          </Form.Item>                                         
          <Form.Item label={i18next.t('location')}>
            {getFieldDecorator('userProfile.location', {
              initialValue: this.state.initialValue.userProfile.location,
              rules: [{ required: true, message: i18next.t('error-message-required-location') }]
            })(<SearchLocation size="large"/>
            )}
          </Form.Item>     
          <Form.Item label={i18next.t('address')}>
            {getFieldDecorator('userProfile.address', {
              initialValue: this.state.initialValue.userProfile.address,
              rules: [
                { required: true, message: i18next.t('error-message-required-address') },
                { max: MAX_LENGTH.address, message: i18next.t('error-message-max-character', {max: MAX_LENGTH.address})}
              ],
            })(<Input size="large"/>
            )}
          </Form.Item>                           
          <Form.Item label={i18next.t('tags')}>
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
    );
  }
}

const WrappedCandidateProfileFormForm = Form.create({ name: 'candidate_profile' })(CandidateProfileForm);
export default WrappedCandidateProfileFormForm;
