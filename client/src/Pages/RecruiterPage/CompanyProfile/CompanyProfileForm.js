import React from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker, Icon, notification} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from '../../../Utils/axios';
import SearchLocation from '../../../Shared/Form-Items/SearchLocation/SearchLocation';
import moment from 'moment';
import { urlMatching, urlValidator, validatePhoneNumber, maxStringLengthInArray, maxArrayLength } from '../../../Shared/Validators/validators';
import { getCompanySizeOptions } from '../../../Utils/codeset';
import UploadImage from '../../../Shared/Form-Items/UploadImage/UploadImage';
import { withTranslation } from 'react-i18next';
import { MAX_LENGTH, DATE_FORMAT } from '../../../Utils/constants';
import i18next from 'i18next';


const { Option } = Select;

class CompanyProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companySizeOptions: [],
      initialValue: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  componentDidMount() {
    getCompanySizeOptions()
    .then((options) => {
      this.setState({companySizeOptions: options});
    });

    axios.post('/user')
    .then((res) => {
      const data = {
        ...res.data,
        establishingYear: moment(res.data.establishingYear),
        birthday: moment(res.data.birthday)
      }

      if(data.image){
        data.image = [
          {
            uid: '1',
            url:res.data.image
          }
        ]        
      }
      this.setState({initialValue: data});
    });  
  }

  openNotification = (message) => {
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
          ...values,
        }
        data.companyProfile.establishingYear = values.companyProfile.establishingYear.toDate();

        axios.put('/user/employer/', data).then(res => {
          this.openNotification('Profile has been successfully updated!');
        });
      } 
    });
  };

  disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('month');
  }

  onImageChange(files){
    let update = true;
    files.forEach((value) =>{
      if(value.status !== 'done'){
        update = false;
      }
    });

    if(update){
      // if file is added update, if not delete
      if(files.length > 0){
        const file = files[0].originFileObj;
        const formData = new FormData();
        formData.append('image', file);

        axios.put('/user/employer/profile-pic', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          this.openNotification('Profile picture has been successfully updated!');
        }); 
      }else{
        axios.delete('/user/employer/profile-pic').then(res => {
          this.openNotification('Profile picture has been deleted!');
        }); 
      }
    }
  } 

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>     
          <Form.Item label={this.props.t('company-logo')}>
              {getFieldDecorator('companyProfile.image',{
                initialValue: this.state.initialValue.image
              })(
                <UploadImage maxLength={1} onChange={this.onImageChange}/>
              )}
          </Form.Item>
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
            <Form.Item label={this.props.t('company-name')}>
              {getFieldDecorator('companyProfile.name', {
                initialValue:this.state.initialValue.name,
                rules: [
                  { required: true, message: this.props.t('error-message-required-company-name') },
                  { max: MAX_LENGTH.companyName, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.companyName})}
                ],
              })(
                <Input size="large"/>,
              )}
            </Form.Item>       
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label={this.props.t('company-id')}>
                {getFieldDecorator('companyProfile.companyId', {
                  initialValue:this.state.initialValue.companyId,
                  rules: [
                    { required: true, message: this.props.t('error-message-required-company-id') },
                    { max: MAX_LENGTH.employer.companyId, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.employer.companyId})}
                  ],
                })(
                  <Input size="large"/>,
                )}
              </Form.Item>           
            </Col>           
          </Row> 
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label={this.props.t('founded')}>    
                {getFieldDecorator('companyProfile.establishingYear', { 
                  initialValue:this.state.initialValue.establishingYear,
                  rules: [
                  { required: true, message: this.props.t('error-message-required-founded') }
                ]
                })(
                  <DatePicker size="large" format={DATE_FORMAT} style={{width: '100%'}} disabledDate={d => d.isSameOrAfter(moment())}/>
                )}     
              </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label={this.props.t('company-size')}>    
                {getFieldDecorator('companyProfile.companySize', { 
                  initialValue:this.state.initialValue.companySize,
                  rules: [
                  { required: true, message: this.props.t('error-message-required-company-size') }
                ]
                })(
                  <Select allowClear={true} size="large">
                    {this.state.companySizeOptions.map( (value, index) => {
                      return(<Option key={index} value={value.value}>{value.label}</Option>)
                    })}
                  </Select>
                )}     
              </Form.Item>           
            </Col>           
          </Row>       
          <Form.Item label={this.props.t('description')}>
            {getFieldDecorator('companyProfile.description', {
              initialValue:this.state.initialValue.description,
              rules: [
                //{ required: true, message: this.props.t('error-message-required-description') },
                { max: MAX_LENGTH.employer.description, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.employer.description})}
              ]
            })(
              <TextArea rows={6} size="large"/>,
            )}
          </Form.Item>      
          <div style={{marginTop: '30px', borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
              <h2>
                {this.props.t('socials')}
              </h2>
          </div>    
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label="Facebook">    
                {getFieldDecorator('companyProfile.urls.facebookPageUrl', { 
                  initialValue:this.state.initialValue.facebookPageUrl,
                  rules: [
                    {validator: urlMatching('facebook')},
                    {max: MAX_LENGTH.url, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.url})}
                  ]
                })(
                  <Input size="large" suffix={ <Icon type="facebook"/>} />
                )}     
              </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label="Twitter">    
                {getFieldDecorator('companyProfile.urls.twitterPageUrl', {
                  initialValue:this.state.initialValue.twitterPageUrl,
                  rules: [
                    {validator: urlMatching('twitter')},
                    {max: MAX_LENGTH.url, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.url})}
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
                {getFieldDecorator('companyProfile.urls.googlePageUrl', { 
                  initialValue:this.state.initialValue.googlePageUrl,
                  rules: [
                    {validator: urlMatching('google')},
                    {max: MAX_LENGTH.url, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.url})}
                  ]
                })(
                  <Input size="large" suffix={ <Icon type="google"/>} />
                )}     
              </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label="Linkedin">    
                {getFieldDecorator('companyProfile.urls.linkedinPageUrl', {
                  initialValue:this.state.initialValue.linkedinPageUrl,
                  rules: [
                    {validator: urlMatching('linkedin')},
                    {max: MAX_LENGTH.url, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.url})}
                  ]
                })(
                  <Input size="large" suffix={ <Icon type="linkedin"/>} />
                )}     
              </Form.Item>           
            </Col>           
          </Row>    
          <Row>
            <Form.Item label="Github">    
              {getFieldDecorator('companyProfile.urls.githubPageUrl', { 
                initialValue:this.state.initialValue.githubPageUrl,
                rules: [
                  {validator: urlMatching('github')},
                  {max: MAX_LENGTH.url, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.url})}
                ]
              })(
                <Input size="large" suffix={ <Icon type="github"/>} />
              )}     
            </Form.Item>  
          </Row>
          <div style={{marginTop: '30px', borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
              <h2>
                {this.props.t('contact')}
              </h2>
          </div>                                
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label={this.props.t('first-name')}>
                {getFieldDecorator('companyProfile.firstname', {
                  initialValue:this.state.initialValue.firstname,
                  rules: [
                    { required: true, message: this.props.t('error-message-required-first-name') },
                    { max: MAX_LENGTH.name, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.name})}
                  ]
                })(
                  <Input size="large"/>,
                )}
            </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label={this.props.t('last-name')}>    
                {getFieldDecorator('companyProfile.lastname', { 
                  initialValue:this.state.initialValue.lastname,
                  rules: [
                  { required: true, message: this.props.t('error-message-required-last-name') },
                  { max: MAX_LENGTH.name, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.name})}
                  ]
                })(
                  <Input size="large"/>
                )}     
              </Form.Item>           
            </Col>           
          </Row> 
          <Row>
            <Form.Item label={i18next.t('birthday')}>
                {getFieldDecorator('companyProfile.birthday', {
                  initialValue:this.state.initialValue.birthday,
                  rules: [
                    { required: true, message: i18next.t('error-message-required-birthday') },
                  ]
                })(<DatePicker size="large" style={{width: '100%'}} format={DATE_FORMAT} defaultPickerValue={moment().subtract(18,'year')} disabledDate={d => d.isAfter(moment().subtract(18,'year'))}/>)}
              </Form.Item>          
          </Row>       
          <Row>
            <Col span={12} style={{padding: ' 0 4px 0 0'}}>
              <Form.Item label={this.props.t('email')}>
                {getFieldDecorator('email', {
                  initialValue:this.state.initialValue.email,
                  rules: [
                    { required: true, message: this.props.t('error-message-required-email') },
                    {
                      type: 'email',
                      message: this.props.t('error-message-invalid-email'),
                    },
                    {max: MAX_LENGTH.email, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.email})}
                  ]
                })(
                  <Input size="large" disabled={true}/>,
                )}
            </Form.Item>           
            </Col>
            <Col span={12} style={{padding: ' 0 0 0 4px'}}>
              <Form.Item label={this.props.t('phone-number')}>    
                {getFieldDecorator('companyProfile.number', { 
                  initialValue:this.state.initialValue.number,
                  rules: [
                  { required: true, message: this.props.t('error-message-required-phone-number') },
                  { max: MAX_LENGTH.phoneNumber, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.phoneNumber})},
                  { validator: validatePhoneNumber}
                ]
                })(
                  <Input placeholder={i18next.t('phone-number-placeholder')} size="large"/>
                )}     
              </Form.Item>           
            </Col>           
          </Row> 
          <Form.Item label={this.props.t('website')}>
            {getFieldDecorator('companyProfile.urls.homePageUrl', {
              initialValue:this.state.initialValue.homePageUrl,
              rules: [
                {max: MAX_LENGTH.url, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.url})},
                {validator: urlValidator}
              ]
            })(
              <Input rows={6} size="large"/>,
            )}
          </Form.Item>                                         
          <Form.Item label={this.props.t('location')}>
            {getFieldDecorator('companyProfile.location', {
              initialValue:this.state.initialValue.location,
              rules: [{ required: true, message: this.props.t('error-message-required-location') }],
            })(<SearchLocation size="large"/>
            )}
          </Form.Item>     
          <Form.Item label={this.props.t('address')}>
            {getFieldDecorator('companyProfile.address', {
              initialValue:this.state.initialValue.address,
              rules: [
                { required: true, message: this.props.t('error-message-required-address') },
                { max: MAX_LENGTH.address, message: this.props.t('error-message-max-character', {max: MAX_LENGTH.address})}
              ],
            })(<Input size="large"/>
            )}
          </Form.Item>                           
          <Form.Item label={this.props.t('tags')}>
            {getFieldDecorator('companyProfile.tags', {
              initialValue:this.state.initialValue.tags,
              rules: [
                {
                  validator: maxStringLengthInArray(MAX_LENGTH.employer.tags)
                },
                {
                  validator: maxArrayLength(MAX_LENGTH.employer.tagsArrayLimit)
                }
              ]              
            })(
              <Select mode="tags" size="large" style={{ width: '100%' }} placeholder="Tags Mode">
              </Select>,
            )}
          </Form.Item>  
          <Form.Item >
            <Button size="large" style={{marginRight:'0px', marginLeft: 'auto', display:'block'}} type="primary" htmlType="submit">
              {this.props.t('update')}
            </Button>
          </Form.Item>  
        </Form>      
      </div>
    );
  }
}

const WrappedCompanyProfileFormForm = withTranslation()(Form.create({ name: 'company_profile' })(CompanyProfileForm));
export default WrappedCompanyProfileFormForm;
