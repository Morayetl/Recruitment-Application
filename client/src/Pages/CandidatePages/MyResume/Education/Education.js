import React from 'react';
import { Button, Modal, Tooltip, Icon, Col, Row} from 'antd';
import education from '../../../../icons/students-cap.svg';
import EducationEditModal from './EducationEdit/EducationEdit';
import axios from '../../../../Utils/axios';
import { connect } from 'react-redux';
import { setEducation } from '../../../../redux/actions/resume.actions';
import EducationAdd from './EducationAdd/EducationAdd';
import { monthYear } from '../../../../Utils/dateHandler';
import i18next from 'i18next';

const { confirm } = Modal;

class Education extends React.Component {

  constructor(props){
    super(props);
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    this.onOk = this.onOk.bind(this);
  }

  showDeleteConfirm(content,id) {
    confirm({
      title: 'Are you sure delete education?',
      content: content.schoolName,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => this.onOk(id)
    });
  }    

  onOk(id){
    axios.delete('/resume/education/'+id).then((res)=>{
      this.props.dispatch(setEducation({education: res.data}));
    })    
  }

  render() {
    return (
      <Row>
        <Row style={{borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '5px', marginBottom: '20px'}}>
          <Row type="flex">
            <Col>
              <h3>
                {i18next.t('education')}
              </h3>
            </Col>
            <Col style={{margin: 'auto 0px auto auto'}}>
              <div style={{display: this.props.education.length < 10 ? 'block' : 'none'}}>
                <EducationAdd/>
              </div>
            </Col>
          </Row>
        </Row>
        {
          this.props.education.map((value, index) => {
            return(
              <Row type="flex" key={index} justify={'space-between'} style={{ marginTop: '20px'}}>
                <Col>
                  <Icon component={education} style={{ fontSize: '60px', margin: '0 20px 0 20px'}}/>
                </Col>
                <Col span={21}>
                  <Row type="flex">
                    <span>
                      {value.qualificationLevelCodeset[i18next.languages[0]]}
                    </span>
                    <div style={{margin: '0 0px 0 auto'}}>
                      <Row type="flex">
                        <EducationEditModal data={value}/>
                        <Tooltip>
                          <Button onClick={() => this.showDeleteConfirm(value, value._id)} type="link">
                            <Icon type="delete"/>
                          </Button>
                        </Tooltip>                      
                      </Row>
 
                    </div>
                  </Row>
                  <Row>
                    <span>
                      { monthYear(value.startDate) + ' - ' + monthYear(value.endDate) }
                    </span>
                  </Row>                
                  <Row>
                    <span>
                      {value.schoolName }
                    </span>
                  </Row>   
                  <Row>
                    <span style={{marginTop: '15px'}}>
                      {value.description }
                    </span>
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
    education
  } = resumeReducer;

  return {
    education
  };
}

export default connect(mapStateToProps)(Education);
