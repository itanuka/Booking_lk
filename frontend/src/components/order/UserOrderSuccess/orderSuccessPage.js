
import './orderSuccessPage.css'
import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../../layout/MetaData';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import AdminFooter from '../../layout/AdminFooter';

const orderSuccessUI = ({ match }) => {
      return (
        <Fragment>
          <MetaData title={'Order Success'}/>
          <Header/>
         
        <div>
          <div className="kataymCard78945">
            <div>
              <div>
                <img className="img852963" src="../images/orderSuceesImgPie.png" />
              </div>
              <div>
                <img className="img878945263" src="../images/ordersuccessgirl.png" />
              </div>
              <Link to = "/orders/me"><button className="buttonRidirectOrder" style={{verticalAlign: 'middle'}}><span>View Your Orders </span></button></Link>
            </div>
          </div>
        </div>
        <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>   <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>   <br/>  <br/>  <br/>  <br/>  <br/>   <br/>  <br/>  <br/>  <br/>  <br/>   <br/>  <br/>  <br/>  
        <Footer/>
        </Fragment>
        
      )
    }
  
export default orderSuccessUI 