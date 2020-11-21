export const extractDataFromStorage = (payload) => {
    return fetch(`https://springbootbackendjava.herokuapp.com/getAll?pageNo=${payload}&pageSize=10`, {
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

export const getPageCount = () => {
    return fetch(`https://springbootbackendjava.herokuapp.com/getBooksData`, {
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

export const getPageResult = (payload) => {
    return fetch(`https://springbootbackendjava.herokuapp.com/searchBook`, {
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
