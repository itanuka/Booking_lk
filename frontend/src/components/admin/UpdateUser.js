import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import AdminFooter from '../layout/AdminFooter';
import Admin_nav from '../layout/AdminNav';

import "react-datetime/css/react-datetime.css";
import '../style/home.css';
import '../style/adminFeedback.css'
import '../style/login.css';
import '../style/profile.css';


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'

const UpdateUser = ({ history, match }) => {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [phone_no, setPhoneNo] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, isUpdated } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails);

    const userId = match.params.id;

    useEffect(() => {

        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setGender(user.gender);
            setAddress(user.address);
            setPhoneNo(user.phone_no);
            setEmail(user.email);
            setRole(user.role)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('User updated successfully')
            history.push('/admin/users')
            dispatch({
                type: UPDATE_USER_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated, user, userId])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.set('first_name', first_name);
        formData.set('last_name', last_name);
        formData.set('gender', gender);
        formData.set('address', address);
        formData.set('phone_no', phone_no);
        formData.set('email', email);
        formData.set('role', role);

        dispatch(updateUser(user._id, formData));
    }

    return (
        <Fragment>
            <MetaData title={'Update User'} />
            <Header />
            <section className="container_yo">
                <Admin_nav />
            </section>

            <div class="container mb-5 min-vh-100">
                <div class="row hero-section">
                </div>
                <div class="row mt-5 mb-5">
                    <div class="col-md-2"></div>
                    <div class="col-md-8">
                        <div class="card ">
                            <div class="card-body">
                                <h2 class="mb-4">Update User Role</h2>

                                <form onSubmit={submitHandler} >

                                    <div class="form-row">
                                        <div class="col">
                                            <label for="inputFirstName">First Name</label>
                                            <input type="text"
                                                class="form-control"
                                                name='first_name'
                                                placeholder="First name"
                                                value={first_name}
                                                required
                                            />
                                        </div>

                                        <div class="col">
                                            <label for="inputLastName">Last Name</label>
                                            <input type="text"
                                                class="form-control"
                                                name='last_name'
                                                placeholder="Last name"
                                                value={last_name}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div class="form-row mt-2">
                                        <div class="col">
                                            <label for="inputPhoneNumber">Phone Number</label>
                                            <input type="text"
                                                class="form-control"
                                                name='phone_no'
                                                placeholder=" 0778542152"
                                                value={phone_no}
                                                required
                                            />
                                        </div>

                                        <div class="col">
                                            <label for="inputRole">Role</label>
                                            <select id="inputState"
                                                name='role'
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                                default="male"
                                                class="form-control">
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-row mt-2">
                                        <div class="form-group col-md-12">
                                            <label for="inputEmail4">Email</label>
                                            <input type="email"
                                                class="form-control"
                                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                                                name='email'
                                                placeholder=" E-mail Address"
                                                value={email}
                                                required
                                                id="inputEmail4" />
                                        </div>
                                    </div>

                                    <button type="submit" class="btn btn-primary"
                                        style={{ width: '100%', height: '40px' }}
                                    >Update</button>
                                </form>
                                <div class="custom-bottem mt-2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2"></div>
                </div>
            </div>

            <Footer />
        </Fragment>
    )
}

export default UpdateUser
