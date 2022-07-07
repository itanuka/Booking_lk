import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Header from '../layout/Header'
import Footer from '../layout/Footer'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'

import '../style/login.css'

const Login = ({ history, location }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(state => state.auth);

  useEffect(() => {
    const redirect = location.serach ? location.search.split('=')[1] : '/'

    if (isAuthenticated) {
      history.push(redirect)
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, isAuthenticated, error, history])


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Login'} />
          <Header />

          <div class="container body">
            <div class="row mt-5 mb-5">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <div class="card ">
                  <img src="https://images.unsplash.com/photo-1587986100063-d1c34ca3dc6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                    class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h2 class="mb-4">Sign In</h2>

                    <form onSubmit={submitHandler}>
                      <div class="form-group ">
                        <label for="email_field">Email address</label>
                        <input type="email"
                          class="form-control"
                          name="name"
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                          id="email_field"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          aria-describedby="emailHelp" />

                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with
                          anyone
                          else.</small>
                      </div>
                      <div class="form-group">
                        <label for="password_field">Password</label>
                        <input type="password"
                          class="form-control"
                          name="psw"
                          id="password_field"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} />
                      </div>

                      <button type="submit" class="btn btn-primary custom-btn-signIn" >Sign In</button>
                    </form>

                    <div class="row">
                      <div class="col-md-4 mt-2">
                        <div class="form-group form-check">
                          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                          <label class="form-check-label" for="exampleCheck1">Remember me</label>
                        </div>
                      </div>
                      <div class="col-md-4"></div>
                      <div class="col-md-4 mt-2">

                        <Link to="/password/forgot" style={{ textDecoration: 'none' }}>Forgot password?</Link>
                      </div>
                    </div>
                    <div class="custom-bottem mt-2">
                      <span>Not a member? </span><span ><Link to="/register" style={{ textDecoration: 'none' }}>Sign Up</Link> </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-3"></div>
            </div>
          </div>
          <Footer />

        </Fragment>
      )}

    </Fragment>
  )
}

export default Login
