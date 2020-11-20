// import BrowserService from "../BrowserService"
// import jwt_decode from "jwt-decode";

// export const deleteAllCartDetails = (payload) => {
//     const token = BrowserService.getLocalStorageValue("token");
//     var decoded = jwt_decode(token);
//     let phoneNumber = decoded.sub;
//     payload.map((item => {
//         const url = `https://springbootbackendjava.herokuapp.com/delete/${phoneNumber}/${item._id}`;
//         return fetch(`${url}`, {
//             mode: "cors",
//             method: 'DELETE'
//         })
//             .then((response) => {
//                 return response;
//             }).catch((err) => {
//                 return Promise.reject("Error Occured while Fetching Customers " + err);
//             });
//     }))

// }