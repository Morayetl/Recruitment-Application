export const SET_WORK_EXPERIENCE = 'SET_WORK_EXPERIENCE';
export const SET_EDUCATION = 'SET_EDUCATION';
export const SET_RESUME = 'SET_RESUME';
export const SET_PROFESSIONAL_SKILL = 'SET_PROFESSIONAL_SKILL';

export const setWorkExperience = resume => ({
    type: SET_WORK_EXPERIENCE,
    data: resume
});

export const setEducation = resume => ({
    type: SET_EDUCATION,
    data: resume
});

export const setResume = resume => ({
    type: SET_RESUME,
    data: resume
});

export const setProfessionalSkill = resume => ({
    type: SET_PROFESSIONAL_SKILL,
    data: resume
});
