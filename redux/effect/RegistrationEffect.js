export const registerUser = (item) => {
    const url="https://springbootbackendjava.herokuapp.com/post/customerInfoDetails";
    return fetch(`${url}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept':"application/json"
          },
        mode:"cors",
        body: JSON.stringify(item)
    })
    .then((response)=>{ 
        return response;
    }).then((data)=>{
        return data;
    })
    .catch((err) => {
        return Promise.reject("Error Occured while Fetching Customers " + err);
    });
};
