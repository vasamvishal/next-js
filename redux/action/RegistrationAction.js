
export const REGISTER_PAGE = "REGISTER_PAGE";
export const REGISTER_SUCESS = "REGISTER_SUCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const INITIAL_STATE = "INITIAL_STATE";

export const registerPage = (item) => ({
    type: "REGISTER_PAGE",
    payload: item
})

export const registerSucess = (item) => ({
    type: "REGISTER_SUCESS",
    payload: item
})

export const registerFailure = () => ({
    type: "REGISTER_FAILURE"
})

export const intialState = () => ({
    type: "INITIAL_STATE"
})

