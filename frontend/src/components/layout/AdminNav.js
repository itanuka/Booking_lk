
import React,{Fragment} from 'react'
import { Link } from 'react-router-dom'

import '../style/admin_nav.css'
//import '../script/admin_nav'
import '../style/home.css'
import {Helmet} from "react-helmet";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
    faUserSecret,
    faThLarge,
    faBars,
    faUser,
    faUserTie,
    faTruckMoving,
    faFileInvoice,
    faWarehouse,
    faCommentDots,
    faStickyNote,
    faPrint,
    faSignOutAlt,
    faArrowRight,
    faCannabis
                } from '@fortawesome/free-solid-svg-icons';

import { faOpera} from '@fortawesome/free-brands-svg-icons';

const Admin_nav = () => {
    return (
        <Fragment>
            
            <Helmet>
                <script src="/scripts/admin_nav.js"></script>
                <script src="https://kit.fontawesome.com/48ca456f8a.js" ></script>
            </Helmet>
            <div className="sidebar">
            <div className="logoDetails">
                <div className="admin_logo">

                <div className="logo_name">Booking.lk</div>
            </div>
            
                    
            <i className="fas fa-arrow-right" id="btn" onClick="function()"></i></div>
            
            <ul className="nav_links">
                <li>
                    <a href="/admin/Dashboard">
                    <div className="i">
                    <FontAwesomeIcon icon={faThLarge}></FontAwesomeIcon></div>
                 
                    <span className="link_name">DashBoard</span>
                    </a>
                <span className="tooltips">Dashboard</span>
                </li>
                <li>
                    <a href="/admin/orders">
                    <div className="i">
                    <FontAwesomeIcon icon={faOpera}></FontAwesomeIcon></div>
                
                    <span className="link_name">Orders</span>
                    </a>
                   <span className="tooltips">Oders</span>
                </li>
                <li>
                    <a href="/admin/movies">
                    <div className="i">
                    <FontAwesomeIcon icon={faBars}></FontAwesomeIcon></div>
              
                    <span className="link_name">Movies</span>
                    </a>
                    <span className="tooltips">Movies</span>
                </li>
                <li>
                    <a href="/admin/theaters">
                    <div className="i">
                    <FontAwesomeIcon icon={faCannabis}></FontAwesomeIcon></div>
              
                    <span className="link_name">Theaters</span>
                    </a>
                    <span className="tooltips">Theaters</span>
                </li>
                <li>
                    <a href="/admin/users">
                    <div className="i">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon></div>
               
                    <span className="link_name">User</span>
                    </a>
                    <span className="tooltips">User</span>
                </li>
                
                

                
                <li>
                    <a href="/admin/report">
                    <div className="i">
                    <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon></div>
               
                    <span className="link_name">Payment Details</span>
                    </a>
                    <span className="tooltips">Payment Details</span>
                </li>
                
            </ul>
        </div>
        
        
        </Fragment>
    )
}

export default Admin_nav