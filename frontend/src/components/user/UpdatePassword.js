import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Header from '../layout/Header';
import Footer from '../layout/Footer';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

import '../style/changePassword.css'

const UpdatePassword = ({ history }) => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch();
    const { error, isUpdated, loading } = useSelector(state => state.user);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Password updated successfully')
            history.push('/me')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated])


    const submitHandler = (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
        dispatch(updatePassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Change Password'} />
            <Header />

            <div class="container  min-vh-100">
                <div class="row hero-section">
                </div>

                <div class="row mt-5 mb-5 ">
                    <div class="col-md-3"></div>
                    <div class="col-md-6 ">
                        <div class="card ">
                            <div class="card-body">
                                <h2 class="mb-4">Change Password</h2>

                                <form onSubmit={submitHandler}>
                                    <div class="form-group ">
                                        <label for="password_field">Old Password</label>
                                        <input type="password"
                                            class="form-control"
                                            id="password_field"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="password_field">New Password</label>
                                        <input type="password"
                                            class="form-control"
                                            id="password_field"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </div>

                                    <button type="submit"
                                        disabled={loading ? true : false}
                                        class="btn btn-primary custom-btn-signIn" >Update Password</button>
                                </form>

                                <div class="row">

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

export default UpdatePassword
