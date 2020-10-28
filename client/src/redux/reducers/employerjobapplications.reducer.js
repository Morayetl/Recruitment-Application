import { 
    SELECTED_CANDIDATE,
    UPDATE_CANDIDATE_LIST
} from "../actions/employerjobapplications.actions";

const employerJobApplicationsReducer = (state = {
    selectedUserId: '',
    candidates: []
}, action) => {
    switch(action.type){   
        case SELECTED_CANDIDATE:
            return {
                ...state,
                selectedUserId: action.data.selectedUserId          
            }       
        case UPDATE_CANDIDATE_LIST:
            return {
                ...state,
                candidates: action.data.candidates        
            }                                      
        default:
            return state;
    }
}

export default employerJobApplicationsReducer;