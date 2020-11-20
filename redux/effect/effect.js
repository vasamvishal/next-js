import fetch from 'isomorphic-unfetch';
export const registerUser = () => {
    console.log("blahregisterUser");
    return fetch(`https://springbootbackendjava.herokuapp.com/getAll?pageNo=0&pageSize=10`, {
        mode: "cors",
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(result =>
        result.json()
        ).then(data => {
            return data
        })
        .catch((err) => {
            return Promise.reject("Error Occured while Fetching Customers " + err);
        })
}