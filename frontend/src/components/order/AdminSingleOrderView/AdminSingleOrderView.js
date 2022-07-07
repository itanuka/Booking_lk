
import React,{Fragment, useState ,useEffect} from 'react'
import AlertTemplate, { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'

import {  useDispatch, useSelector } from 'react-redux'
import {  adminUpdateOrder, clearErrors, getSingleOrder } from '../../../actions/orderActions'
import { A_UPDATE_ORDER_RESET } from '../../../constants/orderConstants'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AdminAllOrders from '../AdminAllOrders/AdminOrdersUI'

import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import AdminFooter from '../../layout/AdminFooter';

import './adminSingleOrderView.css'

const AdminSingleOrderView = ({match}) => {

    

    // const alert = useAlert();
    const dispatch = useDispatch();

    const {loading, order ={}} = useSelector(state => state.myOrderDetails)
    const { customerName, phone_no,  orderItems, paymentInfo, deliveryInfo,itemsPrice,createdAt,orderStatus,totPrice} = order;
    const {error , isUpdated} = useSelector(state => state.adminUpdateOrder)

    const orderId = match.params.id; 

    const [pStatus, setPStatus] = useState(paymentInfo && paymentInfo.paymentStatus);
    const [oStatus, setOStatus] = useState(orderStatus);
    const [dStatus, setDStatus] = useState(deliveryInfo && deliveryInfo.deliveryStatus);
    const alert = useAlert();

    useEffect(() => {
        
      dispatch(getSingleOrder(orderId))

      if(error){
        dispatch(clearErrors())
      }

      if(isUpdated){
        // alert.success('Order Updated Successfully');
        dispatch(getSingleOrder(match.params.id));
        dispatch({type: A_UPDATE_ORDER_RESET})
      }

    },[dispatch,error,isUpdated,orderId])

    const updateOrderHandler = (e) => {

        // alert("Update handler working and passing data");

        const adminOrderUpdate = {
            'paymentInfo.paymentStatus':pStatus,
            'orderStatus':oStatus,
            'deliveryInfo.deliveryStatus':dStatus
        }

      dispatch(adminUpdateOrder(orderId, adminOrderUpdate))
      alert.success("Status Updated Successfully!");
    }


    return (
        <Fragment>
          <Header/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <div>
          <div className="sopCon">
            <p className="oidn"> Order ID # </p>
            <p className="oidnum">{order._id}</p>
            <hr className="hr001" />
            <p className="tamnt"> Total Amount : {totPrice} </p>
            <p />
            <br />
            <table>
              <tbody><tr>
                  <td className="tableCol0003">
                    <table name="customerDetails">
                      <tbody><tr>
                          <td className="tableCol0001">Customer Name</td>
                          <td className="tableCol0002">{customerName}</td>
                        </tr>
                        <tr>
                          <td className="tableCol0001">Telephone Number</td>
                          <td className="tableCol0002">{deliveryInfo && deliveryInfo.phone_no}</td>
                        </tr>
                        <tr>
                          <td className="tableCol0001">Delivery Address</td>
                          <td className="tableCol0002">{deliveryInfo && deliveryInfo.deliveryAddress}
</td>
                        </tr>
                        <tr>
                          <td className="tableCol0001">Order Created on</td>
                          <td className="tableCol0002">{createdAt}</td>
                        </tr>
                      </tbody></table>
                  </td>
                  <td className="tableCol0004">
                    <table name="Status">
                      <tbody><tr>
                          <td className="tableCol0001">Payment Status</td>
                          <td className={String(paymentInfo && paymentInfo.paymentStatus).includes('Paid') ? " tableCol0002 green" : "tableCol0002 red" }>{paymentInfo && paymentInfo.paymentStatus}</td>
                          
                        </tr>
                        <tr>
                          <td className="tableCol0001">Order Status</td>
                          <td className={String(orderStatus).includes('Baked') ? " tableCol0002 green" : String(orderStatus).includes('Baking') ? " tableCol0002 orange" : "tableCol0002 red" }>{orderStatus}</td>
                          
                        </tr>
                        <tr>
                          <td className="tableCol0001">Delivery Status</td>
                          <td className={String(deliveryInfo && deliveryInfo.deliveryStatus).includes('Delivered') ? " tableCol0002 green" : String(deliveryInfo && deliveryInfo.deliveryStatus).includes('Delivering') ? " tableCol0002 orange" : "tableCol0002 red" }>{deliveryInfo && deliveryInfo.deliveryStatus}</td>
                          
                        </tr>
                      </tbody></table>
                  </td>
                </tr>
              </tbody></table>
            <br /><br/><br/>
            <p className="itemsTopic">Ordered Cakery Items</p><br/>
            <table name="orderDetails">
              <tbody><tr>
                  <td className="tableCol0008">Movie Name</td>
                  <td className="tableCol0008">Size</td>
                  <td className="tableCol0008">Topping</td>
                  <td className="tableCol0008">Qty</td>
                  <td className="tableCol0008">Price</td>
                </tr>

                {orderItems && orderItems.map(item => (
                <tr>
                  <td className="tableCol0009">{item.name}</td>
                  <td className="tableCol0009">{item.size}</td>
                  <td className="tableCol0009">{item.topping}</td>
                  <td className="tableCol0009">{item.quantity}</td>
                  <td className="tableCol0009">{item.price}</td>
                </tr>
                ))}

              </tbody></table>
            <br />
            <center><Link to={`/admin/orders/`} style={{ textDecoration: 'none', color: 'black' }}><button className="btnfoot2199">Back to Orders</button></Link></center>
          </div>
          <div className="stUpCont">
            <form>
              <p className="ststxt">Payment Status</p>
              <div className="statSel">
                <select name="PS" onChange={(e) => setPStatus(e.target.value)} id="format">
                  <option selected disabled  >{paymentInfo && paymentInfo.paymentStatus}</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <br />
              <p className="ststxt">Order Status</p>
              <div className="statSel">
                <select name="OS" onChange={(e) => setOStatus(e.target.value)} id="format">
                  <option selected disabled>{orderStatus}</option>
                  <option value="Pending">Pending</option>
                  <option value="Baking">Baking</option>
                  <option value="Baked">Baked</option>
                </select>
              </div>
              <br />
              <p className="ststxt">Delivery Status</p>
              <div className="statSel">
                <select name="DS" onChange={(e) => setDStatus(e.target.value)} id="format">
                  <option selected disabled >{deliveryInfo && deliveryInfo.deliveryStatus}</option>
                  <option value="Pending">Pending</option>
                  <option value="Delivering">Delivering</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <br />
              <br />
              <button className="sbmtbutton" style={{verticalAlign: 'middle'}} onClick={() => updateOrderHandler(order._id)}>
                <span>Update Status </span>
              </button>
            </form>
          </div>
        </div>
        
        <br/><br/><br/>
        
        <AdminFooter/>
        </Fragment>
        )
      }
      
        export default AdminSingleOrderView
      