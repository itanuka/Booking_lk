import React,{Fragment, useState, useEffect} from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import { useDispatch , useSelector } from 'react-redux'
import { getAllorders } from '../../../actions/orderActions'

import Header from '../../layout/Header';
import MetaData from '../../layout/MetaData'
import Admin_nav from '../../layout/AdminNav';

const report = () => {
    return (
        <Fragment>
            <MetaData title ={'Reports'}/>
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
        <Fragment>
                <Header/>
            <section className="container_yo">
                    <Admin_nav/>
                </section>
                <section className="container55555">
                    

                <h1 className="h12">Reports</h1><br/><br/>                    
                    <Link to="/Finacereport/">
                        <button className="button565465847655654">
                            <div className ="learn-more2">
                            <span class="circle" aria-hidden="true">
                            <span class="icon arrow"></span>
                            </span>
                            <span class="button-text">Finance Report</span>
                            </div>

                        </button>
                    </Link>
                   </section>
                    
                </Fragment>
            </Fragment>
    )
}

export default report
