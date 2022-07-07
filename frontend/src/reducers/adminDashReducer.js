
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
    CLEAR_ERRORS
    

} from '../constants/adminDashCountConstant'



export const countReducers = (state= {},action) =>{
    switch(action.type){
        case ORDER_COUNT_REQUEST:
        case THEATER_COUNT_REQUEST:
        case USER_COUNT_REQUEST:
        case MOVIE_COUNT_REQUEST:
            return {
                loading:true,
                
            }
        case ORDER_COUNT_SUCCESS:
        case THEATER_COUNT_SUCCESS:
        case USER_COUNT_SUCCESS:
        case MOVIE_COUNT_SUCCESS:
            return{
                loading:false,
                usersCount:action.payload.usersCount,
                theatersCount:action.payload.theatersCount,
                odersCount:action.payload.odersCount,
                totalAmount:action.payload.totalAmount,
                moviesCount:action.payload.moviesCount

            }

        case ORDER_COUNT_FAIL:
        case THEATER_COUNT_FAIL:
        case USER_COUNT_FAIL:
        case MOVIE_COUNT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
            


        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
            
            default:
            return state;
        
    }
}