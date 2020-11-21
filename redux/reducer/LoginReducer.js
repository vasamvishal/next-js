
import { LOGIN, loginFailure, loginSucess, LOGINFAILURE, LOGINSUCESS, SET_INITIAL_STATE } from "../action/LoginAction"
// import { loginToStorage } from "../effect/LoginEffect";
import BrowserService from "../../BrowserService/BrowserService";
import { Cmd, loop } from "redux-loop";
// import BrowserService from "../../BrowserService/BrowserService";

export const initialState = {
    loginData: [],
    status: 200,
    login: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
             console.log(action.payload);
            // const url = "https://springbootbackendjava.herokuapp.com/login";
            // return fetch(`${url}`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': "application/json"
            //     },
            //     mode: "cors",
            //     credentials: "include",
            //     body: JSON.stringify(action.payload)
            // })
            //     .then((response) => {
            //         for (var pair of response.headers.entries()) {
            //             if (pair[0] === 'token') {
            //                 BrowserService.setLocalStorageValue("token", pair[1])
            //             }
            //         }
            //         console.log(response,"response");
            //         let responseText = response.text();
            //         return [responseText, response];
            //     }).then((data) => {
            //         data[0].then((data) => BrowserService.setLocalStorageValue("user", data));
            //         var response = data[1];
            //         console.log("responseeeee");
            //         // dispatch({type:loginSucess,payload:response})
            //         return response;
            //     })
            //     .catch((err) => {
            //         return Promise.reject("Error Occured while Fetching Customers " + err);
            //     });

            // loginToStorage(action.payload)
            // return loop(state, Cmd.run(loginToStorage, {
            //     successActionCreator: loginSucess,
            //     failActionCreator: loginFailure,
            //     args: [action.payload]
            // }));
        }

        case LOGINSUCESS: {
            console.log("action payload",action.payload);
            return {
                ...state,
                loginData: action.payload,
                status: action.payload.status,
                login: true
            };
        }

        case LOGINFAILURE: {
            return {
                ...state,
                loginData: [],
                status: 400,
                login: false
            };
        }

        case SET_INITIAL_STATE: {
            return initialState;
        }

        default:
            return state;
    }
}
export const loginToStorage = (item) => {
    console.log(item,"item");
    
};