import BrowserService from "../../BrowserService/BrowserService";
import jwt_decode from "jwt-decode";


export const extractGetCartDetails = () => {
    const token = BrowserService.getLocalStorageValue("token");
    var decoded = jwt_decode(token);
    let phoneNumber = decoded.sub;
    const url = `https://springbootbackendjava.herokuapp.com/getCartDetails/${phoneNumber}`;
    return fetch(`${url}`, {
        mode: "cors",
        headers: {
            'Accept': 'application/json',
        },
    })
        .then((response) => {
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            return Promise.reject("Error Occured while Fetching Customers " + err);
        });
}

export const cancelOrder = (payload) => {
    const token = BrowserService.getLocalStorageValue("token");
    var decoded = jwt_decode(token);
    let phoneNumber = decoded.sub;
    const url = `https://springbootbackendjava.herokuapp.com/delete/${phoneNumber}/${payload._id}`;
    return fetch(`${url}`, {
        mode: "cors",
        method: 'DELETE'
    })
        .then((response) => {
            return response;
        }).catch((err) => {
            return Promise.reject("Error Occured while Fetching Customers " + err);
        });

}


