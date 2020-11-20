
import {LOGIN,loginFailure,loginSucess,LOGINFAILURE,LOGINSUCESS,SET_INITIAL_STATE} from "../action/LoginAction"
import {loginToStorage} from "../effect/LoginEffect";
import { Cmd, loop } from "redux-loop";

export const initialState = {
    loginData:[],
    status:200,
    login:false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            console.log(action.type,"type");
            return loop(state, Cmd.run(loginToStorage, {
                successActionCreator: loginSucess,
                failActionCreator: loginFailure,
                args: [action.payload]
            }));
        }

        case LOGINSUCESS: {
            console.log(action.type,"type");
            console.log(action.payload,"payload");
            return {
                ...state,
                loginData: action.payload,
                status:action.payload.status,
                login:true
            };
        }

        case LOGINFAILURE: {
            console.log(action.type,"type");
            console.log(action.payload,"payload");
            return {
                ...state,
                loginData:[],
                status:400,
                login:false
            };
        }

        case SET_INITIAL_STATE:{
            return initialState;
        }

        default:
            return state;
    }
}