import React,{Fragment, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import { BrowserRouter as Router, Route } from 'react-router-dom'

// import { useAlert } from 'react-alert'
import { useDispatch , useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../../actions/orderActions'

import  USOCard from "../UserSingleOrder/UserSingleOrder"

import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import './userOrders.css'
  

const MyOrders = () => {

//   const alert = useAlert();
  const disptach = useDispatch();

  const {loading,orders,error} = useSelector(state => state.myOrders)

//   const keyword = match.params.keyword

//   const [pStatus, setPStatus] = useState('')
//   const [oStatus, setOStatus] = useState('')
//   const [dStatus, setDStatus] = useState('')
  
  
  useEffect(() => {
    disptach(myOrders());

    if(error){
        // alert.error(error);
        dispatchEvent(clearErrors())
    }

  },[disptach, error])


    return (
        <Fragment>
          <Header/>
          <br/><br/><br/><br/><br/><br/><br/><br/>
        <div className="bgimage201">
          <center><img src="/images/bg206.png"></img></center>
          <div>
            <img className="rotateimage206" src="/images/cake206.png"></img>
          </div>
        </div>
 
        <div className="uhtc">
          <meta charSet="UTF-8" />
          <link href="https://fonts.googleapis.com/css?family=Ek+Mukta:300,400,600|Open+Sans:400,800" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" />
          
          {/* <div className="bodyCont"> */}
            {/*-----------------------------search button---------------------------------------------------------*/}
              {/* <Route render ={({ history }) => <AdminOrderSearch history = {history}/>}/>
          </div> */}

            <div className="tableContainer">
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col col-1">Order Id</div>
                  <div className="col col-2">Date</div>
                  <div className="col col-4">No of Items</div>
                  <div className="col col-5">Total Price</div>
                  <div className="col col-6">Payment Status</div>
                  <div className="col col-7">Order Status</div>
                  <div className="col col-8">Deliver Status</div>
                </li>

                {orders && orders.map(order => (
                 
                 <Link to={`/order/${order._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <li key={order._id} className="table-row">
                  <div className="col col-1" data-label="Order Id">{order._id}</div>
                  <div className="col col-2" data-label="Date">{String(order.createdAt).substring(0,10)}</div>
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
            </div>
       <Footer/>
       </Fragment>
  )
}

<Router>
     
<MyOrders/>
<Route path="/orders/me" component={MyOrders} exact/>
<Route path="/order/:id" component={USOCard} exact/>

</Router>

  export default MyOrders