import {
    ADD_TO_CART, DELETE_FROM_CART, successpostCartDetails
    , failurepostCartDetails, SET_INITIALSTATE_FOR_BUYPAGE,
    SELECTED_NO_OF_ITEMS, SUCESS_POST_CART_DETAILS,
    FAILURE_POST_CART_DETAILS
} from "../action/BuyPriceAction";
import { postCartDetails } from "../effect/BuyPageEffect";
import { Cmd, loop } from "redux-loop";
import { REDIRECT_TO_CART_PAGE } from "../action/BuyPriceAction";

export const initialState = {
    addedToCart: [],
    deletedFromCart: false,
    noOfItems: 0,
    cartPage: false,
    cartData:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            return loop(initialState, Cmd.run(postCartDetails, {
                successActionCreator: successpostCartDetails,
                failActionCreator: failurepostCartDetails,
                args: [action.payload]
            }));
        }

        case SUCESS_POST_CART_DETAILS: {
            return { ...state, cartData: action.payload }
        }

        case FAILURE_POST_CART_DETAILS: {
            return { ...state, cartData: [] }
        }

        case DELETE_FROM_CART: {
            return { ...state, addedToCart: [], deletedFromCart: true }
        }

        case SELECTED_NO_OF_ITEMS: {
            return { ...state, noOfItems: action.payload }
        }

        case SET_INITIALSTATE_FOR_BUYPAGE: {
            return { ...initialState }
        }

        case REDIRECT_TO_CART_PAGE: {
            return { ...state, cartPage: true }
        }

        default:
            return state
    }
}