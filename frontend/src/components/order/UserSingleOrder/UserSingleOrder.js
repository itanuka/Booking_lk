import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import PhoneInput from 'react-phone-number-input'
import {Modal} from 'react-bootstrap';
import { useAlert } from 'react-alert'

import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import MyOrders from '../UserAllOrders/UserOrders'

import { useDispatch, useSelector } from 'react-redux'
import { getSingleOrder, deleteOrder, clearErrors, updateSingleOrder } from '../../../actions/orderActions'

import { ORDER_DELETE_RESET } from '../../../constants/orderConstants'
import { U_UPDATE_ORDER_RESET } from '../../../constants/orderConstants'

import './UserSingleOrderCard.css'

const USOCard = ({ match, history }) => {

  const [newPhone_no, setNewPhone_no] = useState('');
  const [newDeliveryAddress, setNewDeliveryAddress] = useState('');
  const [webloading, setWebLoading] = useState(true);
  const alert = useAlert();


  const dispatch = useDispatch();

  const orderID = match.params.id;

  const { loading, order = {} } = useSelector(state => state.myOrderDetails);
  const { paymentInfo, deliveryInfo, orderStatus, totPrice, orderItems, createdAt, customerName, phone_no } = order;
  const { isDeleted, isUpdated, error } = useSelector(state => state.userOrderFunctions);


  useEffect(() => {
    window.scrollTo(0, 0) //scroll top onPage load


    if (order) {
      setNewPhone_no(order.phone_no);
      setNewDeliveryAddress(order.deliveryInfo && order.deliveryInfo.deliveryAddress) 
    }

    if (error) {
      dispatch(clearErrors())
    }

    if (isDeleted) {
      history.push("/orders/me");
      dispatch({ type: ORDER_DELETE_RESET })
    }

    if (isUpdated) {
      dispatch(getSingleOrder(match.params.id));
      dispatch({ type: U_UPDATE_ORDER_RESET })
    }

    dispatch(getSingleOrder(match.params.id));

  }, [dispatch, error, orderID, isDeleted, isUpdated, history,webloading])

  if (!order) {
    return null
  }

  const deleteOrderHandler = (id) => {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "We will miss your cakey order.",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
      imageUrl: '../images/uovBaking.png',
      imageWidth: 300,
      imageHeight: 300,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOrder(id))
        Swal.fire(
          'Cancelled!',
          'Your Order has been Cancelled.',
          'success'
        )
      }
    })
  }


  const updateOrderHandler = (e) => {
    
    const orderUpdate = {
      'deliveryInfo.phone_no': newPhone_no,
      'deliveryInfo.deliveryAddress': newDeliveryAddress
    }
 
      dispatch(updateSingleOrder(orderID, orderUpdate))

  }




  return (
    <Fragment>
      <Header/>
      <br/> <br/> <br/> <br/> <br/> <br/>
      <div className="USOCCont211">
        <h1 className="orderIDtxt">Order Id</h1>
        <h2 className="orderID">{order._id}</h2>
        <div className="statsCont211">
          <div className="statusCard">
            <div className="statustxtdiv211">
              <p className="ststxt">Payment Status</p><br />
              <p className={String(paymentInfo && paymentInfo.paymentStatus).includes('Paid') ? " statustxt211 green211" : "statustxt211 red211"}>{paymentInfo && paymentInfo.paymentStatus}</p><br />
              <Link to={`/newbill/`}><button className={String(paymentInfo && paymentInfo.paymentStatus).includes('Paid') ? "btn211 disabled" : "btn211"}>Pay</button></Link>
              {/* <Link to={`/newbill/${order.userID}`} */}
            
            </div>
            <div className="stsimgcont211"><img className="stsimg211" src="../images/uovPayment.png" /></div>
          </div>
          <div className="statusCard">
            <div className="statustxtdiv211">
              <p className="ststxt">Order Status</p><br />
              <p className={String(orderStatus).includes('Baked') ? " statustxt211 green211" : String(orderStatus).includes('Baking') ? " statustxt211 orange211" : "statustxt211 red211"}>{orderStatus}</p><br />
            </div>
            <div className="stsimgcont21155"><img className="stsimg211545445" src="../images/uovBaking.png" /></div>
          </div>
          <div className="statusCard">
            <div className="statustxtdiv211">
              <p className="ststxt">Delivery Status</p><br />
              <p className={String(deliveryInfo && deliveryInfo.deliveryStatus).includes('Delivered') ? " statustxt211 green211" : String(deliveryInfo && deliveryInfo.deliveryStatus).includes('Delivering') ? " statustxt211 orange211" : "statustxt211 red211"}>{deliveryInfo && deliveryInfo.deliveryStatus}</p><br />
            </div>
            <div className="stsimgcont211xx"><img className="stsimg211xx" src="../images/uovDeliver.png" /></div>
          </div>
        </div>
        <div className="DeliveryInfoUpdate211">
          <p className="oddivtxt211">Order Details</p>
          <center>
            <form  >
              <table>
                <tbody><tr>
                  <td className="tbleleft211">Customer Name</td>
                  <td className="tbleleft213">{customerName}</td>
                </tr>
                  <tr>
                    <td className="tbleleft211">Created At</td>
                    <td className="tbleleft213">{String(createdAt).substring(0,10)}</td>
                  </tr>
                  <tr>
                    <td className="tbleleft211">Telephone Number</td>
                    <td className="tbleleft212"><input  maxLength={13} minLength className="form__field" type="text" defaultValue={deliveryInfo && deliveryInfo.phone_no} onChange={(e) => setNewPhone_no(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td className="tbleleft211">Delivery Address</td>
                    <td className="tbleleft212"><input className="form__field" type="text" defaultValue={deliveryInfo && deliveryInfo.deliveryAddress} onChange={(e) => setNewDeliveryAddress(e.target.value)} /></td>
                  </tr>
                </tbody></table><br /><br />
              <button disabled={String(orderStatus).includes('Baked') ? true : false} type="submit" className={String(orderStatus).includes('Baked') ? "btn212 disabled" : "btn212"} onClick={(e) => updateOrderHandler(order._id)}>Update Details</button>
              
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to={`/add_feedback/${order._id}`}>
              <button  type="submit" className={String(orderStatus).includes('Baked') ? "btn212 disabled" : "btn212"} >Give Feedback</button>
              </Link>
            </form></center>
        </div>
        <div className="ordcaktxt211">
          <p>Ordered Cakies </p>
        </div>
        <div>
                    <div className="tableContainer">
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">Movie Name</div>
                <div className="col col-2">Size</div>
                <div className="col col-3">Topping</div>
                <div className="col col-4">Qty</div>
                <div className="col col-5">Price</div>
              </li>

              {orderItems && orderItems.map(item => (
                <li className="table-row">
                  <div className="col col-1" data-label="Movie Name">{item.name}</div>
                  <div className="col col-2" data-label="Size">{item.size}</div>
                  <div className="col col-3" data-label="Topping ">{item.topping}</div>
                  <div className="col col-4" data-label="Qty">{item.quantity}</div>
                  <div className="col col-5" data-label="Price">{item.price}</div>
                </li>
              ))}

            </ul>
            <center> <div className="totAmnt211">Total Amount: {totPrice}</div> </center>
          </div>
        </div>
        <div className="footer211">
          <Link to={`/orders/me`} style={{ textDecoration: 'none', color: 'black' }}><button className="btnfoot213">Back to Orders</button></Link>
          <button disabled={String(paymentInfo && paymentInfo.paymentStatus).includes('Paid') ? true : false} onClick={() => deleteOrderHandler(order._id)} className={String(paymentInfo && paymentInfo.paymentStatus).includes('Paid') ? "btnfoot214 disabled" : "btnfoot214"} onClick={() => deleteOrderHandler(order._id)}>Delete Order</button>
        </div>
      </div>
      <br /><br />
      <Footer/>
    </Fragment>
  )

}

<Router>
  <Route path="/orders/me" component={MyOrders} exact />
</Router>


export default USOCard