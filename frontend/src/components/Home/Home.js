import React, { Component } from 'react';
import MetaData from '../layout/MetaData';
import Admin_nav from '../layout/AdminNav';
import Header from "../layout/Header";
import Loader from '../layout/Loader';
import { Link } from "react-router-dom"



export default class AdminDashboard extends Component{

  render(){

    return(
    <div>
<MetaData title ={'Payments'}/>
                            <link
                                                    rel="stylesheet"
                                                    type="text/css"
                                                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                                                    />
                                                    <link
                                                    rel="stylesheet"
                                                    type="text/css"
                                                    href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                                                />
                                                    <link
                                                    href="//db.onlinewebfonts.com/c/157c6cc36dd65b1b2adc9e7f3329c761?family=Amazon+Ember"
                                                    rel="stylesheet"
                                                    type="text/css"
                                                /> 
                            
                                <Header/>
                                <section className="container_yo">
                                    <Admin_nav/>
                                </section>
                
                                <section className="container55555">
                                    <h1>Finance Handling</h1>
                                    <br/><br/><br/><br/>

                
            <Link to = {"/listsup/"} > <div className =  "a_rtk" >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Supplier Management<br/>

                </div>
            </Link><br/><br/><br/><br/>
            <Link to = {"/dellist/"} > <div className =  "a_rtk" >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Delivery Management<br/>

                </div>
            </Link>
            <Link to = {"/listemp/"} > <div className =  "a_rtk" >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Employee Management<br/>

                </div>
            </Link><br/><br/><br/><br/>

                                </section>

                                </div>

    )
  }
}