import axios from 'axios';

import {
    ALL_THEATERS_REQUEST,
    ALL_THEATERS_SUCCESS,
    ALL_THEATERS_FAIL,
    ADMIN_THEATERS_REQUEST,
    ADMIN_THEATERS_SUCCESS,
    ADMIN_THEATERS_FAIL,
    NEW_THEATER_REQUEST,
    NEW_THEATER_SUCCESS,
    NEW_THEATER_FAIL,
    DELETE_THEATER_REQUEST,
    DELETE_THEATER_SUCCESS,
    DELETE_THEATER_FAIL,
    UPDATE_THEATER_REQUEST,
    UPDATE_THEATER_SUCCESS,
    UPDATE_THEATER_FAIL,
    THEATER_DETAILS_REQUEST,
    THEATER_DETAILS_SUCCESS,
    THEATER_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/theaterConstants'

export const getTheaters = () => async (dispatch) => {
    try{

        dispatch({ type: ALL_THEATERS_REQUEST })

        const { data } = await axios.get('/api/v1/theaters')

        dispatch({
            type: ALL_THEATERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_THEATERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newTheater = (theaterData) => async (dispatch) => {
    try{

        dispatch({ type: NEW_THEATER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/theater/new`, theaterData, config)

        dispatch({
            type: NEW_THEATER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_THEATER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete theater (Admin)
export const deleteTheater = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_THEATER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/theater/${id}`)

        dispatch({
            type: DELETE_THEATER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_THEATER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Theater (ADMIN)
export const updateTheater = (id, theaterData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_THEATER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/theater/${id}`, theaterData, config)

        dispatch({
            type: UPDATE_THEATER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_THEATER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getTheaterDetails = (id) => async (dispatch) => {
    try{

        dispatch({ type: THEATER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/theater/${id}`)

        dispatch({
            type: THEATER_DETAILS_SUCCESS,
            payload: data.theater
        })

    } catch (error) {
        dispatch({
            type: THEATER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminTheaters = () => async (dispatch) => {
    try{

        dispatch({ type: ADMIN_THEATERS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/theaters`)

        dispatch({
            type: ADMIN_THEATERS_SUCCESS,
            payload: data.theaters
        })

    } catch (error) {
        dispatch({
            type: ADMIN_THEATERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}