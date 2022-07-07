import React,{Fragment, useState, useEffect} from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useDispatch , useSelector } from 'react-redux'
import { getAllorders } from '../../../actions/orderActions'

import AdminOrderSearch from './AdminOrderSearch'
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import AdminFooter from '../../layout/AdminFooter';
import Admin_nav from '../../layout/AdminNav';

import './adminAllOrders.css'
import "react-datetime/css/react-datetime.css";
import '../../style/home.css';
import '../../style/adminFeedback.css'
  

const AdminAllOrders = ({match}) => {

  const disptach = useDispatch();

  const {loading,orders,totalAmount,noOfItems,count,error} = useSelector(state => state.orders)

  const keyword = match.params.keyword

  const [pStatus, setPStatus] = useState('')
  const [oStatus, setOStatus] = useState('')
  const [dStatus, setDStatus] = useState('')


  
  
  useEffect(() => {

    disptach(getAllorders(keyword,pStatus,oStatus,dStatus));

  },[disptach, error, keyword, pStatus,oStatus,dStatus])


    return (
        <Fragment>
          <Header/>
          <section className="container_yo">
              <Admin_nav/>
          </section>
  
          <section className="container55555">
                <div>
                  <meta charSet="UTF-8" />
                  <link href="https://fonts.googleapis.com/css?family=Ek+Mukta:300,400,600|Open+Sans:400,800" rel="stylesheet" />
                  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" />
                  <div className="pdiv">
                    <p className="p201">Payment Status </p>
                    <p className="p201">Order Status</p>
                    <p className="p201">Delivery Status</p>                    
                  </div>
                  <h2 className="h201">Orders Dashboard </h2>
                  <div className="bodyCont">
                    {/*-----------------------------search button---------------------------------------------------------*/}
                      <Route render ={({ history }) => <AdminOrderSearch history = {history}/>}/>
                  </div>
                  
                  <div>
                    {/*------------------------------------------------------------------------------------------*/}
        
                    {/*Option*/}
                    <div className="filter">
                      <form>
                        <div className="wrapper">
                          <input type="radio" name="select" id="option-1" onClick={pStatus => setPStatus('')}defaultChecked />
                          <input type="radio" name="select" id="option-2" onClick={pStatus => setPStatus('Pending')}/>
                          <input type="radio" name="select" id="option-3" onClick={pStatus => setPStatus('Paid')}/>


                            <label htmlFor="option-1" className="option option-1">
                              <span>All</span>
                            </label>
                            <label htmlFor="option-2" className="option option-2">
                              <span>Pending</span>
                            </label>
                              <label htmlFor="option-3" className="option option-3">
                                <span>Paid</span>
                            </label>

                        </div>
                      </form>
                      <form>
                        <div className="wrapper">
                          <input type="radio" name="select" id="option-4" onClick={oStatus => setOStatus('')} defaultChecked />
                          <input type="radio" name="select" id="option-5" onClick={oStatus => setOStatus('Pending')} />
                          <input type="radio" name="select" id="option-6" onClick={oStatus => setOStatus('Baking')} />
                          <input type="radio" name="select" id="option-7" onClick={oStatus => setOStatus('Baked')} />
                          
                          <label htmlFor="option-4" className="option option-4">
                            <span>All</span>
                          </label>
                          <label htmlFor="option-5" className="option option-5">
                            <span>Pending</span>
                          </label>
                          <label htmlFor="option-6" className="option option-6">
                            <span>Baking</span>
                          </label>
                          <label htmlFor="option-7" className="option option-7">
                            <span>Baked</span>
                          </label>
                        </div>
                      </form>
                      <div>
                        <div className="wrapper1111">
                          <input type="radio" name="select" id="option-8" onClick={dStatus => setDStatus('')} defaultChecked />
                          <input type="radio" name="select" id="option-9" onClick={dStatus => setDStatus('Pending')} />
                          <input type="radio" name="select" id="option-10" onClick={dStatus => setDStatus('Delivering')} />
                          <input type="radio" name="select" id="option-11" onClick={dStatus => setDStatus('Delivered')} />
                          <label htmlFor="option-8" className="option option-8">
                            <span>All</span>
                          </label>
                          <label htmlFor="option-9" className="option option-9">
                            <span>Pending</span>
                          </label>
                          <label htmlFor="option-10" className="option option-10">
                            <span>Delivering</span>
                          </label>
                          <label htmlFor="option-11" className="option option-11">
                            <span>Delivered</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    {/*----------------------------------------------------------------------------------------------*/}

                    <div className="tableContainer">
                      <ul className="responsive1-table">
                        <li className="table-header">
                          <div className="col col-1">Order Id</div>
                          <div className="col col-2">Date</div>
                          <div className="col col-3">Customer Name</div>
                          <div className="col col-4">No of Items</div>
                          <div className="col col-5">Total Price</div>
                          <div className="col col-6">Payment Status</div>
                          <div className="col col-7">Order Status</div>
                          <div className="col col-8">Deliver Status</div>
                        </li>

                        {orders && orders.map(order => (      
                        <Link to={`/admin/order/${order._id}`} style={{ textDecoration: 'none', color: 'black' }}>            
                        <li key={order._id} className="table-row">
                          <div className="col col-1" data-label="Order Id">{order._id}</div>
                          <div className="col col-2" data-label="Date">{String(order.createdAt).substring(0,10)}</div>
                          <div className="col col-3" data-label="Customer Name">{order.customerName}</div>
                          <div className="col col-4" data-label="No of Items">{order.orderItems.length}</div>
                          <div className="col col-5" data-label="Total Price">{order.totPrice}</div>
                          <div className={String(order.paymentInfo.paymentStatus).includes('Paid') ? " col col-6 green" : "col col-6 red" } data-label="Payment Status" >{order.paymentInfo.paymentStatus}</div>
                          <div className={String(order.orderStatus).includes('Baked') ? " col col-7 green" : String(order.orderStatus).includes('Baking') ? " col col-7 orange" : "col col-7 red" } data-label="Order Status">{order.orderStatus}</div>
                          <div className={String(order.deliveryInfo.deliveryStatus).includes('Delivered') ? " col col-8 green" : String(order.deliveryInfo.deliveryStatus).includes('Delivering') ? " col col-8 orange" : "col col-8 red" } data-label="Deliver Status">{order.deliveryInfo.deliveryStatus}</div>
                        </li>
                        </Link>
                        ))}

                      </ul>
                    </div>
                    {/* --------------------------------------------------------------------------------------- */}
                    <div>
                    </div></div></div>
                    </section>
            
            
            </Fragment>
  )
}

  export default AdminAllOrders