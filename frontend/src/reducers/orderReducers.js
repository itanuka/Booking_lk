import {
        CREATE_ORDER_REQUEST,
        CREATE_ORDER_SUCCESS,
        CREATE_ORDER_FAIL,
    
        ALL_ORDERS_REQUEST,
        ALL_ORDERS_SUCCESS,
        ALL_ORDERS_FAIL,

        MY_ORDERS_REQUEST,
        MY_ORDERS_SUCCESS,
        MY_ORDERS_FAIL,

        ORDER_DETAILS_REQUEST, 
        ORDER_DETAILS_SUCCESS,
        ORDER_DETAILS_FAIL,
    
        ORDER_DELETE_REQUEST,
        ORDER_DELETE_SUCCESS,
        ORDER_DELETE_FAIL,
        ORDER_DELETE_RESET,

        A_UPDATE_ORDER_REQUEST,
        A_UPDATE_ORDER_SUCCESS,
        A_UPDATE_ORDER_FAIL,
        A_UPDATE_ORDER_RESET,
        
        U_UPDATE_ORDER_REQUEST,
        U_UPDATE_ORDER_SUCCESS,             
        U_UPDATE_ORDER_RESET,
        U_UPDATE_ORDER_FAIL,
        CLEAR_ERRORS 
    } from '../constants/orderConstants'

//-------------------admin_Get_all_orders--------------------------------------
export const allOrdersReducers = (state = {orders:[] }, action) => {
    switch(action.type){
        case ALL_ORDERS_REQUEST:
            return {
                loading:true,
                orders:[]
            }

        case ALL_ORDERS_SUCCESS:
            return {
                loading:false,
                count:action.payload.count,
                totalAmount:action.payload.totalAmount,
                orders:action.payload.orders

            }

        case ALL_ORDERS_FAIL:
            return {
                loading:false,
                error: action.payload
    
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
        
            }
        
        default:
            return state;
    }
}

//-------------------admin_update_orders--------------------------------------
export const adminUpdateOrdersReducers = (state = {}, action) => {
    switch(action.type){

        case A_UPDATE_ORDER_REQUEST:
            return {
                ...state,
                loading:true,
            }

        case A_UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated: action.payload

            }

        case A_UPDATE_ORDER_FAIL:
            return {
                ...state,
                error: action.payload
    
            }

        case A_UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated:  false
            }
            
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
        
            }
        
        default:
            return state;
    }
}


//--------------------------------user_create_new_order----------------------------------------
export const newOrderReducer = (state = {}, action) => {
    switch(action.type){
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading:true
            }

        case CREATE_ORDER_SUCCESS:
            return {
                loading:false,
                order:action.payload
            }

        case CREATE_ORDER_FAIL:
            return {
                loading:false,
                order:action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }

        default:
            return false;
        
    }
}



//--------------------------------user_get_all_orders-------------------------------------------
export const myOrdersReducer = (state = {orders:[]}, action) => {
    switch(action.type){
        case MY_ORDERS_REQUEST:
            return{
                loading:true
            }
        case MY_ORDERS_SUCCESS:
            return{
                loading:false,
                orders: action.payload
            }
        case MY_ORDERS_FAIL:
            return{
                loading: false,
                error: action.paylaod
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }


}

//--------------user/admin single order---------------------
export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return{
                loading:true
            }
        case ORDER_DETAILS_SUCCESS:
            return{
                loading:false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return{
                loading: false,
                error: action.paylaod
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
}

//--------------user update or delete order---------------------
export const orderUDReducer = (state = {}, action) => {
    switch(action.type){
        case U_UPDATE_ORDER_REQUEST:
        case ORDER_DELETE_REQUEST:
            return{
                ...state,
                loading:true
            }

        case U_UPDATE_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated: action.payload
            }

        case ORDER_DELETE_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted: action.payload
            }

        case U_UPDATE_ORDER_FAIL:
        case ORDER_DELETE_FAIL:
            return{
                ...state,
                error: action.paylaod
            }

        case U_UPDATE_ORDER_RESET:
            return{
                ...state,
                isUpdated: false
            }

        case ORDER_DELETE_RESET:
            return{
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
}
