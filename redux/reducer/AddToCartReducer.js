import {
    ROUTE_TO_BUY_PAGE, GET_CART_DETAILS, SUCESS_CART_DETAILS, FAILURE_CART_DETAILS
    , successCartDetails, failureCartDetails, CANCEL_ORDER,
    successCancelOrder, failureCancelOrder, SUCESS_CANCEL_ORDER, FAILURE_CANCEL_ORDER
} from "../action/AddToCartAction";

import { extractGetCartDetails, cancelOrder } from "../effect/AddToCartEffect";
import { Cmd, loop } from "redux-loop";

export const initialState = {
    routeToBuyPage: false,
    cartData: [],
    payload: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ROUTE_TO_BUY_PAGE: {
            return { ...state, routeToBuyPage: true }
        }

        case GET_CART_DETAILS: {
            return loop(initialState, Cmd.run(extractGetCartDetails, {
                successActionCreator: successCartDetails,
                failActionCreator: failureCartDetails,
                args: [action.payload]
            }));
        }

        case SUCESS_CART_DETAILS: {
            return { ...state, cartData: action.payload }
        }

        case FAILURE_CART_DETAILS: {
            return { ...state, cartData: [] }
        }

        case CANCEL_ORDER: {
            return loop({ ...initialState, payload: action.payload, cartData: state.cartData }, Cmd.run(cancelOrder, {
                successActionCreator: successCancelOrder,
                failActionCreator: failureCancelOrder,
                args: [action.payload]
            }));
        }

        case SUCESS_CANCEL_ORDER: {
            var array = state.cartData;
            array = array.filter(item => item !== state.payload)
            return { ...state, cartData:array }
        }

        case FAILURE_CANCEL_ORDER: {
            return { ...state, cartData: [] }
        }

        default:
            return state;
    }
}

