import { combineReducers } from "redux";
import searchReducer from './search.reducer';
import resumeReducer from './resume.reducer';
import jobPostingReducer from './post-new-job.reducer';
import employerJobApplicationsReducer from './employerjobapplications.reducer';

export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogout = () => ({
    type: USER_LOGOUT,
    data: {}
});

const rootReducer = combineReducers({
    searchReducer,
    resumeReducer,
    jobPostingReducer,
    employerJobApplicationsReducer
});


export const appReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = action.data;
    }    
    return rootReducer(state, action)
}
export default appReducer;