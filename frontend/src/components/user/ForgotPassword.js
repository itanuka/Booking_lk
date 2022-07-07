import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'

import '../style/login.css'

const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(state => state.forgotPassword);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message)
    }

  }, [dispatch, alert, error, message])


  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('email', email);
    dispatch(forgotPassword(formData))

  }


  return (
    <Fragment>
      <MetaData title={'Forgot Password'} />
      <Header />

      <div class="container mb-5 d-flex flex-column min-vh-100">
        <div class="row mt-5 mb-5">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="card ">
              <img src="https://images.unsplash.com/photo-1587986100063-d1c34ca3dc6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                class="card-img-top" alt="..." />
              <div class="card-body">
                <h2 class="mb-4">Forgot Password</h2>

                <form onSubmit={submitHandler}>
                  <div class="form-group ">
                    <label for="email_field">Email address</label>
                    <input type="email"
                      class="form-control"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                      placeholder="example@gmail.com"
                      id="email_field"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby="emailHelp" />

                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with
                      anyone
                      else.</small>
                  </div>

                  <button type="submit"
                    disabled={loading ? true : false}
                    class="btn btn-primary custom-btn-signIn" >Send</button>
                </form>

                <div class="row">
                  <div class="col-md-4 mt-2">
                  </div>
                  <div class="col-md-4"></div>
                  <div class="col-md-4 mt-2">
                  </div>
                </div>
                <div class="custom-bottem mt-2">
                  <span>Create New Account? </span><span ><Link to="/register" style={{ textDecoration: 'none' }}>Sign Up</Link> </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>

      <Footer />
    </Fragment>
  )
}

export default ForgotPassword
