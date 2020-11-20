
import { DELETE_ALL_CART_DETAILS, deleteAllCartDetailsSucess, deleteAllCartDetailsFailure, DELETE_ALL_CART_DETAILS_FAILURE, DELETE_ALL_CART_DETAILS_SUCESS } from "../action/SucessComponentAction"
import { deleteAllCartDetails } from "../effect/SucessComponentEffect";
import { Cmd, loop } from "redux-loop";

export const initialState = {
    deleteAllCart: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ALL_CART_DETAILS: {
            return loop(state, Cmd.run(deleteAllCartDetails, {
                successActionCreator: deleteAllCartDetailsSucess,
                failActionCreator: deleteAllCartDetailsFailure,
                args: [action.payload]
            }));
        }

        case DELETE_ALL_CART_DETAILS_SUCESS: {
            return {
                ...state,
                deleteAllCart: true
            };
        }
        case DELETE_ALL_CART_DETAILS_FAILURE: {
            return {
                ...state,
                deleteAllCart: false
            };
        }
        default:
            return state;
    }
}