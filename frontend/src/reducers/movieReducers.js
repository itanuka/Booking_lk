import {
    ALL_MOVIES_REQUEST,
    ALL_MOVIES_SUCCESS,
    ALL_MOVIES_FAIL,
    ADMIN_MOVIES_REQUEST,
    ADMIN_MOVIES_SUCCESS,
    ADMIN_MOVIES_FAIL,
    NEW_MOVIE_REQUEST,
    NEW_MOVIE_SUCCESS,
    NEW_MOVIE_RESET,
    NEW_MOVIE_FAIL,
    DELETE_MOVIE_REQUEST,
    DELETE_MOVIE_SUCCESS,
    DELETE_MOVIE_RESET,
    DELETE_MOVIE_FAIL,
    UPDATE_MOVIE_REQUEST,
    UPDATE_MOVIE_SUCCESS,
    UPDATE_MOVIE_RESET,
    UPDATE_MOVIE_FAIL,
    MOVIE_DETAILS_REQUEST,
    MOVIE_DETAILS_SUCCESS,
    MOVIE_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/movieConstants'

export const moviesReducer = (state = { movies: []}, action) => {
    switch(action.type) {
        case ALL_MOVIES_REQUEST:
        case ADMIN_MOVIES_REQUEST:
            return {
                loading: true,
                movies: []
            }

        case ALL_MOVIES_SUCCESS:
            return {
                loading: false,
                movies: action.payload.movies,
                moviesCount: action.payload.moviesCount,
                resPerPage: action.payload.resPerPage
            }

        case ADMIN_MOVIES_SUCCESS:
            return {
                loading: false,
                movies: action.payload
            }

        case ALL_MOVIES_FAIL:
        case ADMIN_MOVIES_FAIL:
            return{
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


export const newMovieReducer = (state = { movie: {}}, action) => {
    switch(action.type){

        case NEW_MOVIE_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case NEW_MOVIE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                movie: action.payload.movie
            }

        case NEW_MOVIE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_MOVIE_RESET:
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

export const movieReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_MOVIE_REQUEST:
        case UPDATE_MOVIE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_MOVIE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_MOVIE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_MOVIE_FAIL:
        case UPDATE_MOVIE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_MOVIE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_MOVIE_RESET:
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

export const movieDetailsReducer = (state = {movie: {}}, action) => {
    switch(action.type){

        case MOVIE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case MOVIE_DETAILS_SUCCESS:
            return {
                loading: false,
                movie: action.payload
            }

        case MOVIE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
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