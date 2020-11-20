
export const LOGIN="LOGIN";
export const LOGINSUCESS="LOGINSUCESS";
export const LOGINFAILURE="LOGINFAILURE";
export const SET_INITIAL_STATE="SET_INITIAL_STATE";


export const login = (item) => ({
    type: LOGIN,
    payload: item
})

export const loginSucess = (payload) => ({
    type: LOGINSUCESS,
    payload
})

export const loginFailure = (payload) => ({
    type: LOGINFAILURE,
    payload
})

export const setInitialState = () => ({
    type: SET_INITIAL_STATE
})