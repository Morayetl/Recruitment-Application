export const SELECTED_CANDIDATE = "SELECTED_CANDIDATE";
export const UPDATE_CANDIDATE_LIST = "UPDATE_CANDIDATE_LIST";

export const selectCandidate = data => ({
    type: SELECTED_CANDIDATE,
    data: data
});

export const updateCandidateList = data => ({
    type: UPDATE_CANDIDATE_LIST,
    data: data
});