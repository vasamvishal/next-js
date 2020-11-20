import {
    LOGOUT,
    REDIRECT_TO_ACCOUNT_PAGE,
    REDIRECT_TO_CART_PAGE,
    REDIRECT_TO_HOME_PAGE,
    REDIRECT_TO_SIGNUP_PAGE
} from "../action/HeaderIconsAction";
import { logout } from "../effect/HeaderIconsEffect";

export const initialState = {
    cartPage: false,
    accountPage: false,
    homePage: false,
    signUpPage: false,
    aboutUs: false,
    selectedPage: 1
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REDIRECT_TO_CART_PAGE: {
            return { ...state, cartPage: true, selectedPage: 3 }
        }
        case REDIRECT_TO_ACCOUNT_PAGE: {
            return { ...state, accountPage: true, selectedPage: 1 }
        }
        case REDIRECT_TO_SIGNUP_PAGE: {
            return { ...state, signUpPage: true, selectedPage: 4 }
        }

        case REDIRECT_TO_HOME_PAGE: {
            return { ...state, homePage: true, selectedPage: 4 }
        }
        case LOGOUT: {
            logout()
            break;
        }
        
        default:
            return state
    }
}

