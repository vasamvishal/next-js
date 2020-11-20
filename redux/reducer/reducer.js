import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { Cmd, loop } from "redux-loop";
import { registerUser } from "../effect/effect";
import { INCREMENT_COUNTER, DECREMENT_COUNTER, FETCH_POST, REGISTER_FAILURE, REGISTER_SUCESS, registerSucess, registerFailure } from "../action/counterAction";
export default (state = { value: 0, frog: [] }, action) => {
    switch (action.type) {

        case FETCH_POST: {
            console.log(action.type);
            console.log("firsdt");
            return loop(state, Cmd.run(registerUser, {
                successActionCreator: registerSucess,
                failActionCreator: registerFailure,
                // args: [action.payload]
            }))
            // return {...state,frog:"ddd"}
        }
        case REGISTER_SUCESS: {
            console.log("register Sucess");
            console.log(action.payload);
            return { ...state, frog: action.payload }
        }

        case REGISTER_FAILURE: {
            return { ...state }
        }

        case INCREMENT_COUNTER: {
            console.log(action.type);
            return { ...state, value: state.value + 1 };
        }

        case DECREMENT_COUNTER:
            return { ...state, value: state.value - 1 };
        default:
            return { ...state };
    }
};
// const makeStore = context => createStore(counterReducer);

// export const wrapper = createWrapper(makeStore, { debug: true });
