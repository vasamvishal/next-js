import BrowserService from "../../BrowserService/BrowserService";
import jwt_decode from "jwt-decode";

export const postCartDetails = (payload) => {
    const url = "https://springbootbackendjava.herokuapp.com/post/cart";
    const token = BrowserService.getLocalStorageValue("token");
    var decoded = jwt_decode(token);
    let phoneNumber = decoded.sub;
    const data = Object.assign(payload.item, payload.noOfBooks, { phoneNumber })
    return fetch(`${url}`, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            return Promise.reject("Error Occured while Fetching Customers " + err);
        });
}