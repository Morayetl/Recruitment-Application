import { SET_EDUCATION, SET_WORK_EXPERIENCE, SET_RESUME, SET_PROFESSIONAL_SKILL } from "../actions/resume.actions";

const resumeReducer = (state = {
    education: [],
    workExperience: [],
    professionalSkills: []
}, action) => {
    if(!action.data){
        return state;
    }

    switch(action.type){   
        case SET_RESUME:
            return {
                education: action.data.education ? action.data.education : [],
                workExperience: action.data.workExperience ? action.data.workExperience: [],
                professionalSkills: action.data.professionalSkills ? action.data.professionalSkills : []
            }
        case SET_EDUCATION:
            return {
                ...state,
                education: action.data.education
            }      
        case SET_WORK_EXPERIENCE:
            return {
                ...state,
                workExperience: action.data.workExperience
            }             
        case SET_PROFESSIONAL_SKILL:
            return {
                ...state,
                professionalSkills: action.data.professionalSkills
            }              
        default:
            return state;
    }
}

export default resumeReducer;