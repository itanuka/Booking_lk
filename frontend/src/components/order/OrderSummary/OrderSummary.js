import {Helmet} from "react-helmet";
import React,{Fragment,useState,useEffect} from 'react';
import {useAlert} from 'react-alert'
import { ReactDOM } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { addItemToCart,removeItemFromCart,saveDeliveryInfo } from "../../../actions/cartActions";
import { createOrder,clearErrors } from "../../../actions/orderActions";

import './ordersummary.css'
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import AdminFooter from '../../layout/AdminFooter';

const OrderSummary = ({history}) => {

  const dispatch = useDispatch();

    const {cartItems,deliveryInfo} = useSelector( state => state.cart )
    const { user } = useSelector( state => state.auth)
    const {error} =useSelector(state => state.newOrder)

    //Calculate Order Price
    const itemsPrice = cartItems.reduce((acc,item)=> acc + item.price * item.quantity,0) 
    const totalPrice = (itemsPrice + 200).toFixed(2)

    useEffect(() =>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

    },[dispatch, error])

    const submitOrderHandler = (e) => {
    const order = {
        'userID': user && user._id,
        'customerName' : user && user.first_name + user && user.last_name,
        'orderItems':cartItems,
        'deliveryInfo':deliveryInfo,
        'deliveryPrice' : '200.00',
        'totPrice':totalPrice,
        'orderStatus' : 'Pending'

    }
    dispatch(createOrder(order))
    history.push('/success')
  }


      return (
        <Fragment>
          <Header/>
        <div>
          <div className="wrapper3330">
            <div className="scrollbar3430">
              <p className="cake_box3330">Confirm Order</p>
              <div className="force-overflow3330">
                <div className="scrollbar3330">
                  {/* item-------------------------------------------------------------------------------------- */}
                  <br />  
                  {cartItems.map(item => (
                  <div className="itemCont3330">
                    <img className="itemImg3330" src={item.image} />
                    <label className="itemName3330">{item.name}-{item.size}</label>
                    <label className="itemTopping3330">{item.topping}</label>
                    <label className="itemQty3330">Quantity:{item.quantity}</label>
                    <label className="itemsPrice3330XXX">Rs.{item.price}</label>
                  </div>
                  ))}
                  <br />
                  {/* item-------------------------------------------------------------------------------------- */}
                  <hr className="hr3330" />
                  

                  
                </div>
                <Link to={`/cart`} style={{ textDecoration: 'none', color: 'black' }}><p><i className="arrow3330 left3330" /><label className="backlink3330">Back to Cake Box</label></p></Link>
              </div>
              <div className="oSummeryCont3330xx">
                <lable className="orderSum3330">Order Summary</lable>
                <br />
                
                <table className="tablecont3330xx">
                  <tbody>
                  <tr>
                      <td style={{textAlign: 'right',fontSize :'15px'}}>Customer Name: </td>
                      <td style={{textAlign: 'left',fontSize :'15px'}}> {user && user.first_name} {user && user.last_name}</td>
                    </tr>
                    <tr>
                      <td style={{textAlign: 'right',fontSize :'15px'}}>TelePhone Number: </td>
                      <td style={{textAlign: 'left',fontSize :'15px'}}> {deliveryInfo.phone_no} </td>
                    </tr>
                    <tr>
                      <td style={{textAlign: 'right',fontSize :'15px'}}>Delivery Address: </td>
                      <td style={{textAlign: 'left',fontSize :'15px'}}> {deliveryInfo.deliveryAddress}</td>
                    </tr>
                    <br/>
                    <tr>
                      <td style={{textAlign: 'right',fontSize :'15px'}}>Delivery Price: </td>
                      <td style={{textAlign: 'left',fontSize :'15px'}}> Rs.200.00</td>
                    </tr>
                    <tr>
                      <td style={{textAlign: 'right',fontSize :'30px',fontWeight:'bolder'}}>Total Amount: </td>
                      <td style={{textAlign: 'left',fontSize :'30px',fontWeight:'bolder'}}>Rs.{totalPrice}</td>
                    </tr>
                  </tbody></table>
                  <center><div className="buttonDiv4587"><a className="placeOrder84567" onClick={submitOrderHandler}>Place Order🧁</a></div></center>

                <br />


              </div>
            </div>
          </div>
        </div>
                  <Footer/>
        </Fragment>
        )
      }
      
export default OrderSummary