// import React, { Fragment, useEffect} from 'react'
import { Carousel } from 'react-bootstrap'
import '../style/anuka.css'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getTheaterDetails, clearErrors } from '../../actions/theaterActions' 

//Addede By Ishara----------------------------------------------------
import React, { Fragment, useEffect, useState } from 'react'
import theater from './Theater';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { addTheaterItemToCart } from '../../actions/cartActions';
//--------------------------------------------------------------------


const TheaterDetails = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, theater } = useSelector(state => state.theaterDetails)

    //Addede By Ishara----------------------------------------------------
    const [quantity, setQuentity] = useState(1)
    const [size, setSize] = useState('theater')
    const [sizePrice, setSizePrice] = useState(theater.price)
    const [topping, setTopping] = useState('None')
    const [toppingPrice, setToppingPrice] = useState(0)
    const [name, setNAme] = useState("Limited Theater")

    useEffect(() => {
        dispatch(getTheaterDetails(match.params.id))

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }


    }, [dispatch, alert, error, match.params.id])

    const price = theater.price

    const addToCart = () => {
        dispatch(addTheaterItemToCart(match.params.id, quantity,size,topping,price))
        alert.success("Item Addded to your CakeBox");
        }

    

    return (
        <Fragment>

        {loading ? <Loader /> : (
            <Fragment>

        {loading ? <Loader /> : (
            <Fragment>
                <MetaData title={theater.description}/>
                <Header/>
                <div className="row f-flex justify-content-around">
                    <div className="col-12 col-lg-5 img-fluid" id="theater_image">
                        <Carousel pause='hover'>
                            {theater.images && theater.images.map(image =>(
                                <Carousel.Item key={image.public_id}>
                                    
                                    <img src={image.url} alt={theater.title} width="400px" height="auto"/>
                                </Carousel.Item>
                            ))}
                        </Carousel>

                    </div>

                    <div className="allDetails">
                        <h3>{theater.description}</h3>
                        <h3>End Date: {theater.endDate}</h3>
                        <h3>Price : Rs.{theater.price}</h3>
                        {/* <h3>Created At : {theater.createdAt}</h3> */}

                        <br/><br/>
                        <button className="buttonAddToCart" onClick={addToCart} >Add To Cart</button>
                    </div>

                
                </div>
                <Footer/>
            </Fragment>
        )}

        </Fragment>

        )}
        </Fragment>
        
    )
}

export default TheaterDetails
