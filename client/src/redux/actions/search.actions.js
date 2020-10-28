export const FILTER_CATEGORIES = 'FILTER_CATEGORIES';
export const FILTER_LOCATION = 'FILTER_LOCATION';
export const FILTER_JOBTYPE = 'FILTER_JOBTYPE';
export const FILTER_SALARY = 'FILTER_SALARY';
export const SEARCH_QUERY = 'SEARCH_QUERY';
export const SET_PAGE = 'SET_PAGE';
export const EMPTY_SEARCH = "EMPTY_SEARCH";
export const JOBS_SELECTED_JOB = "JOBS_SELECTED_JOB";

export const filterCategory = search => ({
    type: FILTER_CATEGORIES,
    data: search
});

export const filterLocation = search => ({
    type: FILTER_LOCATION,
    data: search
});

export const filterJobType = search => ({
    type: FILTER_JOBTYPE,
    data: search
});

export const filterSalary = search => ({
    type: FILTER_SALARY,
    data: search
});

export const searchQuery = search => ({
    type: SEARCH_QUERY,
    data: search
});

export const setPage = search => ({
    type: SET_PAGE,
    data: search
});

export const emptySearch = search => ({
    type: EMPTY_SEARCH,
    data: search
});

export const selectJob = data => ({
    type: JOBS_SELECTED_JOB,
    data: data
});