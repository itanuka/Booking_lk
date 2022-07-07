import {Helmet} from "react-helmet";
import React,{Fragment,useState} from 'react';
import PhoneInput from 'react-phone-number-input'
import { ReactDOM } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import { addItemToCart,removeItemFromCart,saveDeliveryInfo } from "../../../actions/cartActions";

import './userCart.css'
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import AdminFooter from '../../layout/AdminFooter';

const UserCartUI = ({history}) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { cartItems,deliveryInfo } = useSelector(state => state.cart) 
  const { user } = useSelector( state => state.auth)

  const [deliveryAddress, setAddress] = useState('')
  const [phone_no, setTpNumber] = useState('')
  const [deliveryStatus, setDeliveryStatus] = useState('Pending')
  

  const submitHandler = (e) => {
    if((deliveryAddress === '') || (phone_no === '')){
      alert.error("Please Fill out all Valid Information");
      
    } else if(user && user._id === ''){
      history.push('/login?redirect=/cart')

    }else{
      dispatch(saveDeliveryInfo({deliveryAddress,deliveryStatus,phone_no}))
      history.push('/confirm_order')
    }
   
  }

  const removerCartHandler = (id) => {
    dispatch(removeItemFromCart(id))
  }


  const incQty = (id,quantity,size,topping,price) =>{
    
    const newQty = quantity + 1;
    dispatch(addItemToCart(id,newQty,size,topping,price))
    }

 const descQty = (id,quantity,size,topping,price) =>{
  
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id,newQty,size,topping,price))
    }

    // const orderHandler =() => {
    //   history.push('/login?redirect=cart')
    // }


  
      return (
        <Fragment>
          <Header/>
        <div>
          <div className="wrapper3330">
            <div className="scrollbar3430">
              <p className="cake_box3330">Your Cake-box</p>
              <div className="force-overflow3330">
                <div className="scrollbar3330">
                  {/* item-------------------------------------------------------------------------------------- */}
                  <br />  
                  {cartItems.map(item => (
                  <div className="itemCont3330">
                    <img className="itemImg3330" src={item.image} />
                    <label className="itemName3330">{item.name}-{item.size}</label>
                    <label className="itemTopping3330">{item.topping}</label>

                    <div className="qtyBtnDiv1456">
                  <div className="value-button" id="decrease" onClick={() => descQty(item.movie,item.quantity,item.size,item.topping,item.price)} value="Decrease Value"><label >{"<<"}</label></div>
                  <input type="number" id="numberQty" value={item.quantity} />
                  <div className="value-button" id="increase" onClick={() => incQty(item.movie,item.quantity,item.size,item.topping,item.price)} value="Increase Value"><label>{">>"}</label></div>
                </div>
                    <div className="buttonCont3330">
                      <button className="noselect3330 button3330" onClick={() => removerCartHandler(item.movie)}>
                        <span className="text3330 span3330">Delete</span>
                        <span className="icon3330 span3330">
                          <svg className="svg3330" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                          </svg>
                        </span>
                      </button>
                    </div>
                    <label className="itemPrice3330">Rs.{item.price}</label>
                  </div>
                  ))}
                  <br />
                  {/* item-------------------------------------------------------------------------------------- */}
                  <hr className="hr3330" />
                  

                  
                </div>
                <Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}><p><i className="arrow3330 left3330" /><label className="backlink3330">Back to shop</label></p></Link>
              </div>
              <div className="oSummeryCont3330">
                <lable className="orderSum3330">Order Summary</lable>
                <br />
                <table className="tablecont3330">
                  <tbody><tr>
                      <td style={{textAlign: 'right'}}>Total items: </td>
                      <td style={{textAlign: 'left'}}> {cartItems.reduce((acc, item) => (acc + Number(item.quantity)),0)} </td>
                    </tr>
                    <tr>
                      <td style={{textAlign: 'right'}}>Total Amount: </td>
                      <td style={{textAlign: 'left'}}>Rs.{cartItems.reduce((acc, item) => (acc + item.quantity * item.price),0).toFixed(2)}</td>
                    </tr>
                  </tbody></table>
                <br />

                <form className="isharaFormSelect">
                <label className="inputLable3330" htmlFor="dAddress">Delivery Address</label><br />
                <input className="input3330" type="text" placeholder="Enter Delivery Address" defaultValue={deliveryAddress} onChange={(e) => setAddress(e.target.value)} required/><br />
                <label className="inputLable3330" htmlFor="tpnum">Telephone Number</label><br />
                <PhoneInput  className="input3330" 
                        international
                        defaultCountry="LK"
                        maxLength={15} 
                        focusInputOnCountrySelection={ false }
                        defaultValue={phone_no} 
                        onChange={ setTpNumber} 
                        required/>

                <br /> <br /> <br />
               
                  
                  {/* delete this button <Link to={`/confirm_order`} style={{ textDecoration: 'none', color: 'black' }}>*/}
                  <button type="submit"  className="btnac3330" id="addtocart"  onClick={submitHandler} >Order Cake Box</button>
                </form>

              </div>
            </div>
          </div>
        </div>
<Footer/>
        </Fragment>
        )
      }
      
export default UserCartUI