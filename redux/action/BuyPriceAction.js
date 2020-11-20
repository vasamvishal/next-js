
export const ADD_TO_CART = "ADD_TO_CART"
export const SELECTED_NO_OF_ITEMS = "SELECTED_NO_OF_ITEMS"
export const DELETE_FROM_CART = "DELETE_FROM_CART"
export const SUCESS_POST_CART_DETAILS = "SUCESS_POST_CART_DETAILS"
export const FAILURE_POST_CART_DETAILS = "SUCESS_POST_CART_DETAILS"
export const REDIRECT_TO_CART_PAGE = "REDIRECT_TO_CART_PAGE"

export const SET_INITIALSTATE_FOR_BUYPAGE = "SET_INITIALSTATE_FOR_BUYPAGE"
export const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item
})

export const successpostCartDetails = (item) => ({
    type: SUCESS_POST_CART_DETAILS,
    payload: item
})

export const failurepostCartDetails = () => ({
    type: FAILURE_POST_CART_DETAILS
    // payload: item
})

export const selectedNoOfItems = (e) => ({
    type: SELECTED_NO_OF_ITEMS,
    payload: e
})
export const deleteFromCart = () => ({
    type: DELETE_FROM_CART
})

export const setInitialStateForBuyPage = () => ({
    type: SET_INITIALSTATE_FOR_BUYPAGE
})

export const redirectToCartPage = () => ({
    type: REDIRECT_TO_CART_PAGE
})
