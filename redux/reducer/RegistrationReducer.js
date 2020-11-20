
import { registerSucess, REGISTER_SUCESS, REGISTER_PAGE, INITIAL_STATE, REGISTER_FAILURE, registerFailure } from "../action/RegistrationAction"
import { registerUser } from "../effect/RegistrationEffect";
import { Cmd, loop } from "redux-loop";

export const initialState = {
    registerData: false,
    status: 200
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_PAGE: {
            return loop(state, Cmd.run(registerUser, {
                successActionCreator: registerSucess,
                failActionCreator: registerFailure
            }));
        }

        case REGISTER_SUCESS: {
            return { ...state, registerData: true, status: action.payload.status }
        }

        case REGISTER_FAILURE: {
            return { ...state, registerData: false }
        }

        case REGISTER_FAILURE: {
            return { ...state, registerData: false }
        }

        case INITIAL_STATE: {
            return initialState;
        }


        default: {
            return state;
        }
    }
}