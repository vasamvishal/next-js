
import {REDIRECT_TO_SIGNUP_PAGE} from "../action/SiteHeaderAction";
export const initialState = {
    signUpPage: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
            case REDIRECT_TO_SIGNUP_PAGE: {
                return { ...state, signUpPage: true, selectedPage: 1 }
            }
            default:
                return state
        }
    }
