
export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";
export const FETCH_POST="FETCH_POST";
export const REGISTER_SUCESS = "REGISTER_SUCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";


//Action Creator
export const incrementCounter = () => ({
   type: INCREMENT_COUNTER
});

export const decrementCounter = () => ({
    type: DECREMENT_COUNTER
});
// fetchPost

export const fetchPost = () => ({
    type: FETCH_POST
});
// REGISTER

export const registerSucess = (item) => ({
    type: REGISTER_SUCESS,
    payload: item
})

export const registerFailure = () => ({
    type: REGISTER_FAILURE
})

export const incrementValue = () => ({
    type: INCREMENT_VALUE
 });
 

export const decrementValue = () => ({
    type: DECREMENT_COUNTER
});