import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import Header from '../layout/Header';
import Footer from '../layout/Footer';

import '../style/profile.css'


const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'My Profile'} />
                    <Header />
                    <div class="container mb-5  min-vh-100">

                        <div class="row hero-section">

                        </div>

                        <div class="row mt-5 info-section">
                            <div class="col-md-4 left-side-info">

                                <div className='ml-5'>
                                    <figure >

                                        <img img src={user.avatar.url}
                                            class="custom-profile-image mt-5 "
                                            alt={user.first_name} />
                                    </figure>

                                    <h6 className='ml-3'>joined at {String(user.createdAt).substring(0, 10)}</h6>
                                </div>
                            </div>

                            <div class="col-md-8 right-side-info">
                                <h3 className='mt-4'>PERSONAL DATA</h3>
                                <hr />
                                <div class="row">
                                    <div class="col-md-6">
                                        <div className='mt-4'>
                                            <h6 >First Name</h6>
                                            <p>{user.first_name}</p>
                                        </div>

                                        <div >
                                            <h6 >Gender</h6>
                                            <p>{user.gender}</p>
                                        </div>

                                        <div>
                                            <h6>Address</h6>
                                            <p>{user.address}</p><br />
                                        </div>

                                    </div>
                                    <div class="col-md-6">

                                        <div className='mt-4'>
                                            <h6>Last Name</h6>
                                            <p>{user.last_name}</p>
                                        </div>

                                        <div>
                                            <h6>phone Number</h6>
                                            <p>{user.phone_no}</p>
                                        </div>

                                        <div>
                                            <h6>E-mail</h6>
                                            <p>{user.email}</p>
                                        </div>

                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6"> <button type="button" class="btn btn-primary mt-4 mb-2 custom-btn" ><Link to="/me/update" id="edit_profile" style={{ textDecoration: 'none', color: 'white' }}> Edit Profile</Link></button></div>
                                    <div class="col-md-6"> <button type="button" class="btn btn-primary mt-4 mb-2 custom-btn"><Link to="/password/update" style={{ textDecoration: 'none', color: 'white' }} > Change Password</Link></button></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </Fragment>
            )}
        </Fragment>
    )
}


export default Profile