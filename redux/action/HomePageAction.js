export const GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS"
export const SET_INITIALSTATE = "SET_INITIALSTATE"
export const SEARCH_BOOKS = "SEARCH_BOOKS"
export const BOOKS_SEARCH = "BOOKS_SEARCH"
export const SEARCH_BOOKS_VALUE = "SEARCH_BOOKS_VALUE"
export const SEARCH_BOOKS_FAILURE = "SEARCH_BOOKS_FAILURE"
export const SELECTED_BOOKS = "SELECTED_BOOKS"
export const SET_STATE = "SET_STATE"
export const GET_PAGE_COUNT = "GET_PAGE_COUNT"
export const PAGE_COUNT_SUCESS = "PAGE_COUNT_SUCESS"
export const PAGE_COUNT_FAILURE = "PAGE_COUNT_FAILURE"
export const BOOKS_SEARCH_SUCESS = "BOOKS_SEARCH_SUCESS"
export const BOOKS_SEARCH_FAILURE = "BOOKS_SEARCH_FAILURE"

export const selectedBook = (item) => ({
    type: SELECTED_BOOKS,
    payload: item
})

export const setState = () => ({
    type: SET_STATE,
})

export const setIntialState = (payload) => ({
    type: SET_INITIALSTATE,
    payload
})

export const getBooksSucces = (payload) => ({
    type: GET_BOOKS_SUCCESS,
    payload
});

export const searchValue = () => ({
    type: BOOKS_SEARCH
});

export const searchBooksValue = (payload) => ({
    type: SEARCH_BOOKS_VALUE,
    payload
});

export const searchBooksFailureAction = (payload) => ({
    type: SEARCH_BOOKS_FAILURE,
    payload
});

export const getPageCount = () => ({
    type: GET_PAGE_COUNT
});

export const pageCountSucess = (payload) => ({
    type: PAGE_COUNT_SUCESS,
    payload
});

export const pageCountFailure = () => ({
    type: PAGE_COUNT_FAILURE
});

export const booksSearchSucess = (payload) => ({
    type: BOOKS_SEARCH_SUCESS,
    payload
});

export const booksSearchFailure = () => ({
    type: BOOKS_SEARCH_FAILURE
});


