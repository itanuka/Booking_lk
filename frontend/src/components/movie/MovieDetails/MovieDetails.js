import React, { Fragment, useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import './movieCardscript.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import NumberFormat from 'react-number-format';

import Loader from '../../layout/Loader'
import MetaData from '../../layout/MetaData'
import Movie from '../Movie';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import AdminFooter from '../../layout/AdminFooter';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieDetails, clearErrors } from '../../../actions/movieActions'

import { addItemToCart } from '../../../actions/cartActions';


const MovieDetails = ({ match }) => {

  const { loading, error, movie } = useSelector(state => state.movieDetails)

  const [quantity, setQuentity] = useState(1)
  const [size, setSize] = useState('1Kg')
  const [sizePrice, setSizePrice] = useState(movie.mediumPrice)
  const [topping, setTopping] = useState('none')
  const [toppingPrice, setToppingPrice] = useState(0)

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {

    alert.info("Please Select a Size");

    window.scrollTo(0, 0) //scroll top onPage load

    dispatch(getMovieDetails(match.params.id))

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }

    
  }, [dispatch, alert, error, match.params.id])


  const addToCart = () => {
    if (Number.isNaN(totPrice)){
      alert.error("Please Select Size");
    }else{
    dispatch(addItemToCart(match.params.id, quantity,size,topping,price))
    alert.success("Item Addded to your CakeBox");
    }
  }

  const incQty = () => {
    const count = document.querySelector('.count')
    const qty = count.valueAsNumber + 1;
    setQuentity(qty)
  }

  const descQty = () => {
    const count = document.querySelector('.count')
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuentity(qty);
  }

  //Calculate single item price with customizations
  // const totPrice = (quantity * (sizePrice+toppingPrice)).toFixed(2);

  const [finalSizeTot, setFinalSizeTot] = useState(movie.mediumPrice) 
  const [finalToppingTot, setFinalToppingTot] = useState(0) 

  // const calcTot =(sizePriceX) =>{
  //   setFinalTot((sizePriceX+toppingPrice).toFixed(2));
  // }

  const sizeHandler = (sizeX, sizePriceX) => {
    setSizePrice(sizePriceX);
    setSize(sizeX);
    setFinalSizeTot(sizePriceX); 
  }

  const toopingHandler = (topingX, toppingPriceX) => {
    setTopping(topingX);
    setToppingPrice(toppingPriceX);
    setFinalToppingTot(toppingPriceX); 
  }
  //calculate price without qty for unit price
  const price = (finalSizeTot + finalToppingTot)
  //caclate price for show toatal valuew withi qty
  const totPrice = (finalSizeTot + finalToppingTot)*quantity


  



  return (
    <Fragment>

      {loading ? <Loader /> : (
        <Fragment>
          <Header/>
          <div className="movieCardDiv">
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <div className="movie_card">

              <div className="movieImgContainer">
                <Carousel pause='hover'>
                  {movie.images && movie.images.map(image => (
                    <Carousel.Item key={image.public_id}>
                      <img className="movieImg" src={image.url} alt={movie.title} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>

              <div className="desContainer">
                <h1 className="movieName" id="movieName">{movie.name}</h1>
                <br />
                <br />
                <div className="Price-text">
                  <p>Unit Price: Rs.
                  </p><p className="Price" id="unitPrice">{movie.mediumPrice}</p>
                  <p />
                </div>
                <br />
                <table className="priceTableCont456">
                  <tr>
                    <td>Small</td>
                    <td>Medium</td>
                    <td>Large</td>
                  </tr>
                  <tr>
                    <td>500g</td>
                    <td>1Kg</td>
                    <td>2Kg</td>
                  </tr>
                  <tr>
                    <td>Rs.{movie.smallPrice}</td>
                    <td>Rs.{movie.mediumPrice}</td>
                    <td>Rs.{movie.largePrice}</td>
                  </tr>
                </table>

                <br />
                <p className="decription" id="decription">{movie.description}</p>
              </div>

              <form>
                <div className="cusContainer">
                  <h2 className="custopic"> Customizations </h2>
                  <br />
                  <br />
                  <div>
                    <div>
                      <p className="p2Size">Choose a Size</p>

                      <div className="selectButton">
                        <div className="radio-container">
                          <input id="500g" name="size" type="radio" defaultValue="500g"  onChange={ () => sizeHandler("500g",movie.smallPrice)} />
                          <label htmlFor="500g">500 g</label>
                          <input  id="1Kg" name="size"  type="radio" defaultValue="1Kg"  onChange={ () => sizeHandler("1Kg",movie.mediumPrice)}  />
                          <label htmlFor="1Kg">1 Kg</label>
                          <input id="2Kg" name="size" type="radio" defaultValue="2Kg" onChange={ () => sizeHandler("2Kg",movie.largePrice)}  />
                          <label htmlFor="2Kg">2 Kg</label>
                        </div>
                      </div>

                      <br />
                      <br />
                      <p className="p2Size">Choose one or more topping</p>

                      <div className="selectButton">
                        <div className="radio-container2">
                          <input  id="0" name="topping"  type="radio" defaultValue="0"   onChange={() => toopingHandler("None", 0)} />
                          <label htmlFor="0">None</label><br />
                          <input id="1" name="topping" type="radio" defaultValue="1"   onChange={() => toopingHandler("Fresh Fruit", movie.freshFruitToppingPrice)} />
                          <label htmlFor="1">Fresh Fruit</label><br />
                          <input id="2" name="topping" type="radio" defaultValue="2"   onChange={() => toopingHandler("Candies and nuts", movie.chocolateCandiesAndCashewNutToppingPrice)}  />
                          <label htmlFor="2">Candies & Cashew Nut</label><br />
                          <input id="3" name="topping" type="radio" defaultValue="3"   onChange={() => toopingHandler("Moldable Fondan", movie.moldableFondanToppingPrice)} />
                          <label htmlFor="3">Moldable Fondan</label>
                        </div>
                      </div>
                      <br />
                    </div>

                    <div className="qtyBtnDiv">
                      <p className="p2Size">Select a quantity</p>
                      <div className="value-button" id="decrease" value="Decrease Value" onClick={descQty} >{'<<'}</div>
                      <input className="count" type="number" id="number" value={quantity} />
                      <div className="value-button" id="increase" value="Increase Value" onClick={incQty} >{'>>'}</div>
                    </div>
                    <br />
                    <br />
                  </div>
                </div>
              </form>

              {/*-----------------blob animation-------------------------------*/}
              <div className="blobcont">
                <div className="blob" />
              </div>

              <div className="totPriceCont">
                <p className="totPrice-text">Total Price: Rs.
                </p><p className="totPrice" id="totPrice">
                  {/* {Number(totPrice*quantity).toFixed(2)} */}
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  value={totPrice}
                  prefix="Rs."
                  decimalSeparator="."
                  displayType="text"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={true}
                  decimalScale={7} />
                  </p>
                <p />
              </div>

              <div className="btncont8426">
                <Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}><button className="btnac244444" id="back">Back to shop</button></Link>
                <button className="btnac4444" id="addtocart" onClick={addToCart}>Add to CakeBox</button>
              </div>

            </div>

          </div>

                  <Footer/>
        </Fragment>
      )
      }

    </Fragment>

  )
}

<Router>
  <Route path="/" component={Movie} exact />
</Router>

export default MovieDetails
