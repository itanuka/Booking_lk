import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { authReducer, userReducer, forgotPasswordReducer, allUserReducer, userDetailsReducer } from "./reducers/userReducers";

import { moviesReducer, newMovieReducer, movieReducer, movieDetailsReducer } from './reducers/movieReducers';
import { theatersReducer, newTheaterReducer, theaterReducer, theaterDetailsReducer } from './reducers/theaterReducers';

import { countReducers } from './reducers/adminDashReducer';

import {
    newOrderReducer,
    myOrdersReducer,
    allOrdersReducers,
    adminUpdateOrdersReducers,
    orderDetailsReducer,
    orderUDReducer
} from './reducers/orderReducers'

import { cartReducer } from './reducers/cartReducer';


const reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    allUsers: allUserReducer,
    forgotPassword: forgotPasswordReducer,
    userDetails: userDetailsReducer,

    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    newMovie: newMovieReducer,
    movie: movieReducer,
    theaters: theatersReducer,
    theaterDetails: theaterDetailsReducer,
    newTheater: newTheaterReducer,
    theater: theaterReducer,

    newOrder: newOrderReducer,
    orders: allOrdersReducers,
    adminUpdateOrder: adminUpdateOrdersReducers,
    myOrders: myOrdersReducer,
    myOrderDetails: orderDetailsReducer,
    userOrderFunctions: orderUDReducer,
    cart: cartReducer,

   
    count: countReducers,
})


let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        deliveryInfo: localStorage.getItem('deliveryInfo')
            ? JSON.parse(localStorage.getItem('deliveryInfo'))
            : {}
    }
}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;