import axios from 'axios'
import { ADD_TO_CART ,
        REMOVE_ITEM_CART,
        SAVE_DELIVERY_INFO} from '../constants/cartConstant'

export const addItemToCart = (id,quantity,size,topping,price) => async (dispatch,getState) => {
    const {data} = await axios.get(`/api/v1/movie/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload:{
            movie:data.movie._id,
            name: data.movie.name,
            image: data.movie.images[0].url,
            quantity,
            price,
            size,
            topping,

        }
    })

    localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItems))
}

//for theater------------------------------------------------------------------
export const addTheaterItemToCart = (id,quantity,size,topping,price) => async (dispatch,getState) => {
    const {data} = await axios.get(`/api/v1/theater/${id}`)
    

    dispatch({
        type: ADD_TO_CART,
        payload:{
            movie:data.theater._id,
            name:"Limited Theater Item",
            image: data.theater.images[0].url,
            quantity,
            price,
            size,
            topping,

        }
    })

    localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItems))
    // alert(JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch,getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload:id
    })

    localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItems))
}

export const saveDeliveryInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_DELIVERY_INFO,
        payload: data
    })
    
    localStorage.setItem('deliveryInfo', JSON.stringify(data))
}
