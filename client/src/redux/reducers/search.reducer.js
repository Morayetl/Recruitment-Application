import { FILTER_CATEGORIES, SEARCH_QUERY/*, FILTER_SALARY*/, FILTER_JOBTYPE, FILTER_LOCATION, SET_PAGE, EMPTY_SEARCH, JOBS_SELECTED_JOB } from "../actions/search.actions";

const searchReducer = (state = {
    page: 1,
    per_page: 30,
    search_query: '',
    jobType: [1,2,3,4,5, 6],
    category: [],
    location: null,
    selectedJob: 0
    //salaryStart: null,
    //salaryEnd: null
}, action) => {
    switch(action.type){   

        case FILTER_CATEGORIES:
            return {
                ...state,
                category: action.data.category
            }
        case FILTER_LOCATION:
            return {
                ...state,
                location: action.data.location
            }
        case FILTER_JOBTYPE:
            return {
                ...state,
                jobType: action.data.jobType
            }
        /* TODO: implement salary range
        case FILTER_SALARY:
            return {
                ...state,
                salaryStart: action.data.salaryStart,
                salaryEnd: action.data.salaryEnd,
            }        */
        case SEARCH_QUERY:
            return {
                ...state,
                search_query: action.data.search_query
            }      
        case SET_PAGE:
            return {
                ...state,
                page: action.data.page
            }                    
        case EMPTY_SEARCH:
            return {
                page: 1,
                per_page: 30,
                search_query: '',
                jobType: [1,2,3,4,5,6],
                category: [],
                location: null
                //salaryStart: null,
                //salaryEnd: null
            }
        case JOBS_SELECTED_JOB:
            return{
                ...state,
                selectedJob: action.data.index
            }
        default:
            return state;
    }
}

export default searchReducer;