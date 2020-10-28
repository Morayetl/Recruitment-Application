import React from 'react';
import { Form, Input, notification, Icon, Button, Row, Rate, Select, InputNumber} from 'antd';
import axios from '../../../../Utils/axios';
import { connect } from 'react-redux';
import { setProfessionalSkill } from '../../../../redux/actions/resume.actions';
import i18next from 'i18next';

const {Option} = Select;


class ProfessionalSkillsForm extends React.Component {
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
        ...this.props.data
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
          duration: values.duration * values.unit
        }

        // if data exists update item
        if(this.props.data){
          axios.put('/resume/professional-skills/' + this.props.data._id, data).then((res)=>{
            this.props.dispatch(setProfessionalSkill({professionalSkills: res.data}));
            this.openSuccessNotification(i18next.t('my-resume-add-skills-update-message'));
            this.props.closeModal();
          });
        }else{
          axios.post('/resume/professional-skills', data).then((res)=>{
            this.props.dispatch(setProfessionalSkill({professionalSkills: res.data}));
            this.openSuccessNotification(i18next.t('my-resume-add-skills-success-message'));
            this.props.form.setFieldsValue({rating: 0 });
            this.props.form.setFieldsValue({rating: undefined, title: undefined});
            this.props.closeModal();
          });
        }
      } 
    });
  };

  calculateDurationInitialValue(value){
    // if no value return 1 as default
    if(!value){
      return 1;
    }

    if((value % 12) === 0){
      return value / 12;
    }

    return value;
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>         
        <Form.Item label={i18next.t('my-resume-add-skills-form-skill-title')}>
          {getFieldDecorator('title', {
            initialValue: this.state.data.title,
            rules: [{ required: true, message: i18next.t('error-message-required-skill-name') }],
          })(
            <Input size="large"/>,
          )}
        </Form.Item>     
        <Form.Item label={i18next.t('my-resume-add-skills-form-experience-title')}>    
          <Input.Group compact>
            {getFieldDecorator('duration', { 
              initialValue: this.calculateDurationInitialValue(this.state.data.duration),
              rules: [
              { required: true, message: i18next.t('error-message-required-rating') }
              ]
            })(
              <InputNumber min={1} size="large" style={{ width: '50%' }}/>
            )}              

            {getFieldDecorator('unit', { 
              initialValue: (this.state.data.duration % 12) === 0 ? "12" : "1"
            })(
              <Select size="large" style={{ width: '50%' }}>
                <Option value="1">{i18next.t('months')}</Option>
                <Option value="12">{i18next.t('years')}</Option>
              </Select>
            )}               
          </Input.Group>  
 
        </Form.Item>         
        <Form.Item label={i18next.t('my-resume-add-skills-form-rating')}>  
          {getFieldDecorator('rating', { 
            initialValue: this.state.data.rating,
            rules: [
            { required: true, message: i18next.t('error-message-required-rating') }
            ]
          })(
            <Rate character={<Icon type="star" />} allowHalf />
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
    professionalSkills
  } = resumeReducer;

  return {
    professionalSkills
  };
}

const ProfessionalSkillsFormRedux = connect(mapStateToProps)(ProfessionalSkillsForm);
const WrappedProfessionalSkillsForm = Form.create({ name: 'professional_skills_form' })(ProfessionalSkillsFormRedux);
export default WrappedProfessionalSkillsForm;
