export const SET_POST_JOB_FORM = 'SET_POST_JOB_FORM';
export const RESET_POST_JOB_FORM = 'RESET_POST_JOB_FORM';
export const SET_POST_JOB_FEATURES = 'SET_POST_JOB_FEATURES';
export const SET_POST_JOB_POSTED_JOB_ID = "SET_POST_JOB_POSTED_JOB_ID";
export const SET_SELECTED_JOB_PACKAGE_ID = "SET_SELECTED_JOB_PACKAGE_ID";
export const SET_POST_JOB_SHOW_IN_FRONT_PAGE = "SET_POST_JOB_SHOW_IN_FRONT_PAGE";

export const SetPostJobForm = form => ({
    type: SET_POST_JOB_FORM,
    data: form
});

export const ResetPostJobForm = form => ({
    type: RESET_POST_JOB_FORM,
    data: {}
});

export const SetPostJobFeatures = feature => ({
    type: SET_POST_JOB_FEATURES,
    data: feature
});

export const SetPostJobPostedJobId = data => ({
    type: SET_POST_JOB_POSTED_JOB_ID,
    data: data
});

export const SetSelectedJobPackageId = data => ({
    type: SET_SELECTED_JOB_PACKAGE_ID,
    data: data
});

export const SetShowInFrontPage = data => ({
    type: SET_POST_JOB_SHOW_IN_FRONT_PAGE,
    data: data
});