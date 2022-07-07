import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import Header from '../layout/Header';
import Footer from '../layout/Footer';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/userActions'

import '../style/changePassword.css'


const NewPassword = ({ history, match }) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch();
    const { error, success } = useSelector(state => state.forgotPassword);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Password reset successfuly')
            history.push('/login')
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);
        dispatch(resetPassword(match.params.token, formData))
    }

    return (
        <Fragment>

            <MetaData title={'New password Reset'} />

            <div class="container  min-vh-100">

                <div class="row hero-section">
                </div>
                <div class="row mt-5 mb-5">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <div class="card ">
                            <div class="card-body">
                                <h2 class="mb-4">Create New Password</h2>

                                <form onSubmit={submitHandler}>
                                    <div class="form-group ">
                                        <label for="password_field">New Password</label>
                                        <input type="password"
                                            class="form-control"
                                            id="password_field"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="password_field">Confirm Password</label>
                                        <input type="password"
                                            class="form-control"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            id="password_field"
                                        />
                                    </div>

                                    <button type="submit"
                                        class="btn btn-primary custom-btn-signIn" >Confirm</button>
                                </form>

                                <div class="row">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3"></div>
                </div>
            </div>

        </Fragment>
    )
}

export default NewPassword
