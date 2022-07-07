import {
    ALL_THEATERS_REQUEST,
    ALL_THEATERS_SUCCESS,
    ALL_THEATERS_FAIL,
    ADMIN_THEATERS_REQUEST,
    ADMIN_THEATERS_SUCCESS,
    ADMIN_THEATERS_FAIL,
    NEW_THEATER_REQUEST,
    NEW_THEATER_SUCCESS,
    NEW_THEATER_RESET,
    NEW_THEATER_FAIL,
    DELETE_THEATER_REQUEST,
    DELETE_THEATER_SUCCESS,
    DELETE_THEATER_RESET,
    DELETE_THEATER_FAIL,
    UPDATE_THEATER_REQUEST,
    UPDATE_THEATER_SUCCESS,
    UPDATE_THEATER_RESET,
    UPDATE_THEATER_FAIL,
    THEATER_DETAILS_REQUEST,
    THEATER_DETAILS_SUCCESS,
    THEATER_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/theaterConstants'

export const theatersReducer = (state = { theaters: [] }, action) => {
    switch(action.type) {

        case ALL_THEATERS_REQUEST:
        case ADMIN_THEATERS_REQUEST:
            return {
                loading: true,
                theaters: []
            }

        case ALL_THEATERS_SUCCESS:
            return {
                loading: false,
                theaters: action.payload.theaters,
                theatersCount: action.payload.theatersCount
            }

        case ADMIN_THEATERS_SUCCESS:
            return {
                loading: false,
                theaters: action.payload
            }

        case ALL_THEATERS_FAIL:
        case ADMIN_THEATERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
            
        default:
            return state;
    }
}


export const newTheaterReducer = (state = { theater: {}}, action) => {
    switch(action.type){

        case NEW_THEATER_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case NEW_THEATER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                theater: action.payload.theater
            }

        case NEW_THEATER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_THEATER_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state
    }
}

export const theaterReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_THEATER_REQUEST:
        case UPDATE_THEATER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_THEATER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_THEATER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_THEATER_FAIL:
        case UPDATE_THEATER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_THEATER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_THEATER_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const theaterDetailsReducer = (state = {theater : {}}, action) =>{
    switch(action.type) {

        case THEATER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case THEATER_DETAILS_SUCCESS:
            return {
                loading: false,
                theater: action.payload
            }

        case THEATER_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}