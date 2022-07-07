import {ADD_TO_CART,
        REMOVE_ITEM_CART,
        SAVE_DELIVERY_INFO} from '../constants/cartConstant'

export const cartReducer = (state = { cartItems:[] }, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const item = action.payload;

            const isItemExist = state.cartItems.find(i => i.movie === item.movie)

            if(isItemExist){
                return{
                    ...state,
                    cartItems: state.cartItems.map(i => i.movie === isItemExist.movie ? item : i)
                }
            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        
        case REMOVE_ITEM_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter(i => i.movie !== action.payload)
            }

        case SAVE_DELIVERY_INFO:
            return{
                ...state,
                deliveryInfo : action.payload
            }

        default:
            return state
    }
}