export const ROUTE_TO_BUY_PAGE = "ROUTE_TO_BUY_PAGE"
export const GET_CART_DETAILS = "GET_CART_DETAILS"
export const SUCESS_CART_DETAILS = "SUCESS_CART_DETAILS"
export const FAILURE_CART_DETAILS = "FAILURE_CART_DETAILS"
export const CANCEL_ORDER= "CANCEL_ORDER"
export const SUCESS_CANCEL_ORDER= "SUCESS_CANCEL_ORDER"
export const FAILURE_CANCEL_ORDER= "FAILURE_CANCEL_ORDER"


export const toBuyPage = () => ({
    type: ROUTE_TO_BUY_PAGE
})

export const toGetCartDetails = () => ({
    type: GET_CART_DETAILS
})

export const successCartDetails = (item) => ({
    type: SUCESS_CART_DETAILS,
    payload:item
})

export const failureCartDetails = () => ({
    type: FAILURE_CART_DETAILS
})

export const cancelOrder = (item) => ({
    type: CANCEL_ORDER,
    payload:item
})

export const successCancelOrder = (item) => ({
    type: SUCESS_CANCEL_ORDER,
    payload:item
})

export const failureCancelOrder = () => ({
    type: FAILURE_CANCEL_ORDER
})
