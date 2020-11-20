export const REDIRECT_TO_ACCOUNT_PAGE = "REDIRECT_TO_ACCOUNT_PAGE"
export const REDIRECT_TO_CART_PAGE = "REDIRECT_TO_LOGIN_PAGE"
export const REDIRECT_TO_HOME_PAGE = "REDIRECT_TO_HOME_PAGE"
export const REDIRECT_TO_SIGNUP_PAGE = "REDIRECT_TO_SIGNUP_PAGE"
export const LOGOUT = "LOGOUT"

export const redirectToAccountPage = () => ({
    type: REDIRECT_TO_ACCOUNT_PAGE
})

export const redirectToCartPage = () => ({
    type: REDIRECT_TO_CART_PAGE
})

export const redirectToHomePage = () => ({
    type: REDIRECT_TO_HOME_PAGE
})

export const redirectToSignUpPage = () => ({
    type: REDIRECT_TO_SIGNUP_PAGE
})

export const logout = () => ({
    type: LOGOUT
})
