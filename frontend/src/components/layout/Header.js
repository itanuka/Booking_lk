import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Helmet } from "react-helmet";
import { logout } from '../../actions/userActions'

import '../style/header.css'

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.')
    }

    return (
        <Fragment>
            <header>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">Booking.lk</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse justify-content-center " id="navbarSupportedContent">
                        <ul class="navbar-nav ">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home <span class="sr-only"></span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Movies</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/me">Profile</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <form class="form-inline my-2 my-lg-0 ">
                            {user ? (
                                <div className="ml-4 dropdown d-inline ">
                                    <Link to="#!" className="btn dropdown-toggle text-white " type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <figure className="avatar avatar-nav">
                                            <img
                                                src={user.avatar && user.avatar.url}
                                                alt={user && user.first_name}
                                                className="rounded-circle "
                                            />
                                        </figure>
                                        <span>{user && user.first_name}</span>
                                    </Link>

                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropDownMenuButton">

                                        {user && user.role === 'admin' && (
                                            <Link className="dropdown-item" to="/admin/Dashboard">Dashboard</Link>
                                        )}
                                        {user.role !== 'admin' && (
                                            <Link className="dropdown-item"  to="/listbill/" >My Payments</Link>
                                        )}
                                        <Link className="dropdown-item" to="/me">Profile</Link>
                                        <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                            Logout
                                        </Link>
                                    </div>

                                </div>
                            ) : !loading && <button type="button" class="btn btn-primary"><a class="text-light" href="/login" style={{ textDecoration: 'none' }} >Sign In</a></button>}
                        </form>
                    </div>
                </nav>
            </header>
        </Fragment>
    )
}

export default Header