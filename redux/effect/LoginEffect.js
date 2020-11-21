import BrowserService from "../../BrowserService/BrowserService"
export const loginToStorage = (item) => {
    console.log(item,"item");
    const url = "https://springbootbackendjava.herokuapp.com/login";
    return fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(item)
    })
        .then((response) => {
            for (var pair of response.headers.entries()) {
                if (pair[0] === 'token') {
                    BrowserService.setLocalStorageValue("token", pair[1])
                }
            }
            let responseText = response.text();
            return [responseText, response];
        }).then((data) => {
            data[0].then((data)=>BrowserService.setLocalStorageValue("user",data));
            var response = data[1];
            return response;
        })
        .catch((err) => {
            return Promise.reject("Error Occured while Fetching Customers " + err);
        });
};