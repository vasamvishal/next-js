export const DELETE_ALL_CART_DETAILS="DELETE_ALL_CART_DETAILS";
export const DELETE_ALL_CART_DETAILS_SUCESS="DELETE_ALL_CART_DETAILS_SUCESS";
export const DELETE_ALL_CART_DETAILS_FAILURE="DELETE_ALL_CART_DETAILS_FAILURE";

export const deleteAllCartDetails = (item) => ({
    type: DELETE_ALL_CART_DETAILS,
    payload: item
})

export const deleteAllCartDetailsSucess = (payload) => ({
    type: DELETE_ALL_CART_DETAILS_SUCESS,
    payload
})

export const deleteAllCartDetailsFailure = () => ({
    type: DELETE_ALL_CART_DETAILS_FAILURE
})