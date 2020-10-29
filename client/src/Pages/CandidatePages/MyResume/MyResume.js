import React from 'react';
import './MyResume.css';
import { Row } from 'antd';
import { connect } from 'react-redux';
import Education from './Education/Education';
import axios from '../../../Utils/axios';
import { setResume } from '../../../redux/actions/resume.actions';
import WorkExperience from './WorkExperience/WorkExperience';
import ProfessionalSkills from './ProfessionalSkills/ProfessionalSkills';

class MyResume extends React.Component {

  componentDidMount(){
    axios.get('/resume')
    .then((res) => {
      this.props.dispatch(setResume(res.data.resume));
    });  
  }
  
  render() {
    return (
      <Row className="my-resume">
        <Row>
          <Education/>
        </Row>
        <Row>
          <WorkExperience/>
        </Row>
        <Row>
          <ProfessionalSkills/>
        </Row>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  const { resumeReducer } = state;
  const {
    education,
    workExperience
  } = resumeReducer;
  return {
    education,
    workExperience    
  };
}


export default connect(mapStateToProps)(MyResume);
