import {
    GET_BOOKS_SUCCESS,
    SELECTED_BOOKS, booksSearchFailure, booksSearchSucess,
    BOOKS_SEARCH_SUCESS, BOOKS_SEARCH_FAILURE, BOOKS_SEARCH,
    SEARCH_BOOKS_FAILURE, getBooksSucces, SET_INITIALSTATE, searchBooksFailureAction, SET_STATE, GET_PAGE_COUNT, pageCountSucess, pageCountFailure, PAGE_COUNT_SUCESS, PAGE_COUNT_FAILURE
} from "../action/HomePageAction"
import { Cmd, loop } from "redux-loop";
import { extractDataFromStorage, getPageCount, getPageResult } from "../effect/HomePageEffect";


export const initialState = {
    storeData: false,
    getAllBookData: [],
    countNoOfPages: 0,
    searchBook: [],
    searchData: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_BOOKS: {
            return { ...state, selectedBook: action.payload, storeData: !state.storeData }
        }

        case SET_STATE: {
            return { ...initialState }
        }

        case SET_INITIALSTATE: {
            return loop(initialState, Cmd.run(extractDataFromStorage, {
                successActionCreator: getBooksSucces,
                failActionCreator: searchBooksFailureAction,
                args: [action.payload]
            }));
        }

        case GET_PAGE_COUNT: {
            return loop(initialState, Cmd.run(getPageCount, {
                successActionCreator: pageCountSucess,
                failActionCreator: pageCountFailure,
            }));
        }
        case PAGE_COUNT_SUCESS: {
            return {
                ...state,
                countNoOfPages: action.payload
            };
        }
        case PAGE_COUNT_FAILURE: {
            return {
                ...state,
                countNoOfPages: []
            };
        }
        case GET_BOOKS_SUCCESS: {
            return {
                ...state,
                getAllBookData: action.payload,
                storeData: false
            };
        }
        case SEARCH_BOOKS_FAILURE: {
            return {
                ...state,
                getAllBookData: []
            };
        }
        case BOOKS_SEARCH: {
            return loop(initialState, Cmd.run(getPageResult, {
                successActionCreator: booksSearchSucess,
                failActionCreator: booksSearchFailure,
                args: [action.payload]
            }));
        }
        case BOOKS_SEARCH_SUCESS: {
            return {
                ...state,
                searchData: action.payload
            };
        }
        case BOOKS_SEARCH_FAILURE: {
            return {
                ...state,
                searchData: []
            };
        }

        default:
            return state
    }
}