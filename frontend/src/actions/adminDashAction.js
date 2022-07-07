import axios from 'axios';

import {
    ORDER_COUNT_REQUEST,
    ORDER_COUNT_SUCCESS,
    ORDER_COUNT_FAIL,

    THEATER_COUNT_REQUEST ,
    THEATER_COUNT_SUCCESS ,
    THEATER_COUNT_FAIL ,

    USER_COUNT_REQUEST ,
    USER_COUNT_SUCCESS ,
    USER_COUNT_FAIL ,

    MOVIE_COUNT_REQUEST,
    MOVIE_COUNT_SUCCESS ,
    MOVIE_COUNT_FAIL,

    COUNT_REQUEST,
    COUNT_SUCCESS,
    COUNT_FAIL,
    CLEAR_ERRORS
    

} from '../constants/adminDashCountConstant'


export const getCount = () => async (dispatch) => {
    try{

        dispatch({ type: THEATER_COUNT_REQUEST})

        const { data } = await axios.get(`/api/v1/count`)

        dispatch({
            type: THEATER_COUNT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: THEATER_COUNT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getUsersCount = () => async (dispatch) => {
    try{

        dispatch({ type: USER_COUNT_REQUEST})

        const { data } = await axios.get(`/api/v1/userCount`)

        dispatch({
            type: USER_COUNT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_COUNT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getTheatersCount = () => async (dispatch) => {
    try{

        dispatch({ type: THEATER_COUNT_REQUEST})

        const { data } = await axios.get(`/api/v1/theaterCount`)

        dispatch({
            type: THEATER_COUNT_SUCCESS,
            payload: data.theatersCount
        })

    } catch (error) {
        dispatch({
            type: THEATER_COUNT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getMoviesCount = () => async (dispatch) => {
    try{

        dispatch({ type: MOVIE_COUNT_REQUEST})

        const { data } = await axios.get(`/api/v1/movieCount`)

        dispatch({
            type: MOVIE_COUNT_SUCCESS,
            payload: data.moviesCount
        })

    } catch (error) {
        dispatch({
            type: MOVIE_COUNT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getOdersCount = () => async (dispatch) => {
    try{

        dispatch({ type: ORDER_COUNT_REQUEST})

        const { data } = await axios.get(`/api/v1/orderCount`)

        dispatch({
            type: ORDER_COUNT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_COUNT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async(dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}
