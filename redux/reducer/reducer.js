import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { Cmd, loop } from "redux-loop";
import { registerUser } from "../effect/effect";
import { INCREMENT_COUNTER, DECREMENT_COUNTER, FETCH_POST, REGISTER_FAILURE, REGISTER_SUCESS, registerSucess, registerFailure } from "../action/counterAction";
export default (state = { value: 0, frog: [] }, action) => {
    switch (action.type) {

        case FETCH_POST: {
            return loop(state, Cmd.run(registerUser, {
                successActionCreator: registerSucess,
                failActionCreator: registerFailure,
            }))
        }
        case REGISTER_SUCESS: {
            return { ...state, frog: action.payload }
        }

        case REGISTER_FAILURE: {
            return { ...state }
        }

        case INCREMENT_COUNTER: {
            return { ...state, value: state.value + 1 };
        }

        case DECREMENT_COUNTER:
            return { ...state, value: state.value - 1 };
        default:
            return { ...state };
    }
};

