import React from 'react';
import { Button, Modal, Tooltip, Icon, Col, Row} from 'antd';
import circle from '../../../../icons/circle.svg';
import axios from '../../../../Utils/axios';
import { connect } from 'react-redux';
import { setWorkExperience } from '../../../../redux/actions/resume.actions';
import WorkExperienceEdit from './WorkExperienceEdit/WorkExperienceEdit';
import WorkExperienceAdd from './WorkExperienceAdd/WorkExperienceAdd';
import { monthYear } from '../../../../Utils/dateHandler';
import i18next from 'i18next';

const { confirm } = Modal;

class WorkExperience extends React.Component {

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
    axios.delete('/resume/work-experience/'+id).then((res)=>{
      this.props.dispatch(setWorkExperience({workExperience: res.data}));
    })    
  }

  showLine(index){
    if(this.props.workExperience.length !== (index + 1)){
      return(
        <div style={{height: '100%'}}>
          <div style={{height: '100%'}}>
            <div style={{height: '100%', width: '1px', margin: '4px auto 4px auto', borderLeft:'2px solid rgba(0,0,0,0.2)'}}>
            </div>
          </div>
        </div> 
      )
    }

    return null;
  }

  render() {
    return (
      <Row>
        <Row style={{borderBottom: '1px solid rgba(0,0,0,0.1)', margin: '20px 0 20px'}}>
          <Row type="flex">
            <Col>
              <h3>
                {i18next.t('work-experience')}
              </h3>
            </Col>
            <Col style={{margin: 'auto 0px auto auto'}}>
              <div style={{display: this.props.workExperience.length < 10 ? 'block' : 'none'}}>
                <WorkExperienceAdd/>
              </div>
            </Col>
          </Row>
        </Row>
        {
          this.props.workExperience.map((value, index) => {
            return(
              <Row type="flex" key={index} justify={'space-between'} style={{ marginTop: '30px'}}>
                <Col span={1}>
                  <Row type="flex" justify="center">
                    <div style={{marginTop: '1px'}}>
                      <Icon component={circle} style={{}}/>
                    </div>
                  </Row> 
                  { this.showLine(index) }
                </Col>
                <Col span={23}>
                  <Row type="flex">
                    <span style={{marginLeft: '5px'}}>
                      { value.title }
                    </span>
                    <span style={{marginLeft: '15px'}}>
                      { value.companyName}
                    </span>
                    <div style={{margin: '0 0px 0 auto'}}>
                      <Row type="flex">
                        <WorkExperienceEdit data={value}/>
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
                    <div style={{marginTop: '10px', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                      {value.description }
                    </div>
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
    workExperience
  } = resumeReducer;

  return {
    workExperience    
  };
}

export default connect(mapStateToProps)(WorkExperience);
