import axios from 'axios';

import {
        CREATE_ORDER_REQUEST,
        CREATE_ORDER_SUCCESS,
        CREATE_ORDER_FAIL,
        //
        ALL_ORDERS_REQUEST,
        ALL_ORDERS_SUCCESS,
        ALL_ORDERS_FAIL,
        //
        A_UPDATE_ORDER_REQUEST,
        A_UPDATE_ORDER_SUCCESS,
        A_UPDATE_ORDER_FAIL,
        A_UPDATE_ORDER_RESET,
        //
        ORDER_DETAILS_REQUEST,
        ORDER_DETAILS_SUCCESS,
        ORDER_DETAILS_FAIL,
        //
        U_UPDATE_ORDER_REQUEST,
        U_UPDATE_ORDER_SUCCESS,             
        U_UPDATE_ORDER_RESET,
        U_UPDATE_ORDER_FAIL,
        //
        ORDER_DELETE_REQUEST,
        ORDER_DELETE_SUCCESS,
        ORDER_DELETE_FAIL,
        ORDER_DELETE_RESET,
        //
        MY_ORDERS_REQUEST,
        MY_ORDERS_SUCCESS,
        MY_ORDERS_FAIL,

        CLEAR_ERRORS 
} from '../constants/orderConstants'


//admin get all orders
export const getAllorders = (keyword ='' , pStatus, oStatus, dStatus) => async (dispatch) => {
    try{
        dispatch({type:ALL_ORDERS_REQUEST})
        
        let link = `/api/v1/admin/orders?keyword=${keyword}`
        // &orderInfo.orderStatus=${oStatus}&deliveryInfo.deliveryStatus=${dStatus}

            if(pStatus){
                link = `/api/v1/admin/orders?keyword=${keyword}&paymentInfo.paymentStatus=${pStatus}`
            }
            if(oStatus){
                link = `/api/v1/admin/orders?keyword=${keyword}&orderStatus=${oStatus}`
            }
            if(dStatus){
                link = `/api/v1/admin/orders?keyword=${keyword}&deliveryInfo.deliveryStatus=${dStatus}`
            }


        const {data} = await axios.get(link)
        dispatch({
            type:ALL_ORDERS_SUCCESS,
            payload: data
        })


    }
    catch(error){
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })

    }


}




//admin update order stats
export const adminUpdateOrder = (id, orderData) => async (dispatch) => {
    // alert("Action recieved" + id + JSON.stringify(orderData))
    try{
        dispatch({type:A_UPDATE_ORDER_REQUEST})

      const config = {
          headers:{
              'Content-Type': 'application/json'
          }
      }

        const {data} = await axios.put(`/api/v1/admin/order/${id}`, orderData,config)
        // alert("link sended" + id + JSON.stringify(orderData))
        dispatch({
            type:A_UPDATE_ORDER_SUCCESS,
            payload: data.success 
        })


    }
    catch(error){
        dispatch({
            type: A_UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })

    }


}

//user-----------------------------------------------------------------------------------
//user create new order
export const createOrder = (order) => async (dispatch, getState) => {

    try{
        
        dispatch({type:CREATE_ORDER_REQUEST})
        

        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.post(`/api/v1/order/new`,order,config)


        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload:data
        })

      
    }catch(error){

    }
}

//User get all orders
export const myOrders = () => async (dispatch) => {
    try{
        dispatch ({type:MY_ORDERS_REQUEST});
        const {data} = await axios.get('/api/v1/orders/me')
        dispatch({
            type:MY_ORDERS_SUCCESS,
            payload:data.orders
            
        })
    } catch(error) {
        dispatch({
            type:MY_ORDERS_FAIL,
            payload: error.response.data.message
        })

    }
}

//User get single order details
export const getSingleOrder = (id) => async (dispatch) => {
    try{
        dispatch ({ type:ORDER_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/order/${id}`)
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data.order
            
        })
    } catch(error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

//User update single order details
export const updateSingleOrder = (id, orderData) => async (dispatch) => {
    try{
        dispatch ({ type:U_UPDATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/order/${id}`, orderData, config)

        dispatch({
            type:U_UPDATE_ORDER_SUCCESS,
            payload:data.success
            
            
        })
    } catch(error) {
        dispatch({
            type:U_UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
        alert(error);

    }
}


//User delete order
export const deleteOrder = (id) => async (dispatch) => {
    try{
        dispatch({type: ORDER_DELETE_REQUEST})

        const {data} = await axios.delete(`/api/v1/order/${id}`)

        dispatch({
            type: ORDER_DELETE_SUCCESS,
            payload: data.success
        }) 
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


//clear erros
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}
