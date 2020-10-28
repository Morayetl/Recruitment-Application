import React from 'react';
import { Button, Modal, Tooltip, Icon, Col, Row, Progress} from 'antd';
import axios from '../../../../Utils/axios';
import { connect } from 'react-redux';
import { setProfessionalSkill } from '../../../../redux/actions/resume.actions';
import ProfessionalSkillsAdd from './ProfessionalSkillsAdd/ProfessionalSkillsAdd';
import ProfessionalSkillsEdit from './ProfessionalSkillsEdit/ProfessionalSkillsEdit';
import i18next from 'i18next';
import { calculateYearsAndMonths } from '../../../../Utils/utils';

const { confirm } = Modal;

class ProfessionalSkills extends React.Component {

  constructor(props){
    super(props);
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    this.onOk = this.onOk.bind(this);
  }

  showDeleteConfirm(content,id) {
    confirm({
      title: 'Are you sure delete skill?',
      content: content.schoolName,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => this.onOk(id)
    });
  }    

  onOk(id){
    axios.delete('/resume/professional-skills/'+id).then((res)=>{
      this.props.dispatch(setProfessionalSkill({professionalSkills: res.data}));
    });
  }

  calculatePercentege(rating){
    if(!rating){
      return 0
    }else{
      return (rating/5)*100;
    }
  }

  render() {
    return (
      <Row>
        <Row style={{borderBottom: '1px solid rgba(0,0,0,0.1)', margin: '20px 0 20px'}}>
          <Row type="flex">
            <Col>
              <h3>
                {i18next.t('skills')}
              </h3>
            </Col>
            <Col style={{margin: 'auto 0px auto auto'}}>
              <div style={{display: this.props.professionalSkills.length < 20 ? 'block' : 'none'}}>
                <ProfessionalSkillsAdd/>
              </div>            
            </Col>
          </Row>
        </Row>
        {
          this.props.professionalSkills.map((value, index) => {
            return(
              <Row type="flex" key={index} justify={'space-between'} style={{ marginTop: '30px'}}>
                <Col span={21}>              
                  <Row>
                    <span>
                      { value.title }
                    </span>

                    <span style={{marginLeft: '10px'}}>
                      { calculateYearsAndMonths(value.duration) }
                    </span>
                  </Row>                
                  <Row type="flex" justify={'space-between'}>
                    <Progress percent={this.calculatePercentege(value.rating)} showInfo={false}/>
                    <div style={{margin: '0 0px 0 auto'}}>

                    </div>                    
                  </Row>   
                </Col>
                <Col>
                  <Row type="flex">
                    <ProfessionalSkillsEdit data={value}/>
                    <Tooltip>
                      <Button onClick={() => this.showDeleteConfirm(value, value._id)} type="link">
                        <Icon type="delete"/>
                      </Button>
                    </Tooltip>                      
                  </Row>
                </Col>
              </Row>
            )
          })
        }
      </Row>

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

export default connect(mapStateToProps)(ProfessionalSkills);
