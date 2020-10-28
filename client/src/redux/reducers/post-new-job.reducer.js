import { SET_POST_JOB_FORM, 
    RESET_POST_JOB_FORM, 
    SET_POST_JOB_FEATURES, 
    SET_POST_JOB_POSTED_JOB_ID, 
    SET_SELECTED_JOB_PACKAGE_ID,
    SET_POST_JOB_SHOW_IN_FRONT_PAGE
} from "../actions/post-new-job.actions";

const jobPostingReducer = (state = {
    job: {},
    jodId: '',
    selectedJobPackageId: '',
    showInFrontPage: false
}, action) => {
    switch(action.type){   
        case SET_POST_JOB_FORM:
            return {
                ...state,
                job: {
                    ...state.job,
                    ...action.data.job          
                }
            }
        case RESET_POST_JOB_FORM:
            return {
                ...state,
                job: {},
                showInFrontPage: false,
                selectedJobPackageId: ''
            }      
        case SET_POST_JOB_FEATURES:
            return {
                ...state,
                job: {
                    ...state.job,
                    showFeatured: action.data.job.showFeatured
                }
            }      
        case SET_POST_JOB_SHOW_IN_FRONT_PAGE:
            return {
                ...state,
                showInFrontPage: action.data
            }       
        case SET_POST_JOB_POSTED_JOB_ID:
            return {
                ...state,
                jobId: action.data.jobId
            }             
        case SET_SELECTED_JOB_PACKAGE_ID:
            return {
                ...state,
                selectedJobPackageId: action.data.selectedJobPackageId
            }                                       
        default:
            return state;
    }
}

export default jobPostingReducer;