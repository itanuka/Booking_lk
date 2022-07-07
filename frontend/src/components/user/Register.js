import React, { Fragment, useState, useEffect } from 'react'

import '../style/register.css'
import '../style/login.css'

import MetaData from '../layout/MetaData'
import Header from '../layout/Header';
import Footer from '../layout/Footer';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'


const Register = ({ history }) => {

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        address: '',
        phone_no: '',
        email: '',
        password: '',

    })

    const { first_name, last_name, gender, address, phone_no, email, password } = user;
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')
    const alert = useAlert();
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/me')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, isAuthenticated, error, history])


    const submitHandler = (e) => {

        e.preventDefault();
        const formData = new FormData();

        formData.set('first_name', first_name);
        formData.set('last_name', last_name);
        formData.set('gender', gender);
        formData.set('address', address);
        formData.set('phone_no', phone_no);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData))
    }

    const onChange = e => {

        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }

    }

    return (
        <Fragment>
            <MetaData title={'Register User'} />
            <Header />
            <div class="container">
                <div class="row mt-5 mb-5">
                    <div class="col-md-2"></div>
                    <div class="col-md-8">

                        <div class="card ">
                            <img src="https://images.unsplash.com/photo-1617914309185-9e63b3badfca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                class="card-img-top" alt="..." />

                            <div class="card-body">
                                <h2 class="mb-4">Sign Up</h2>

                                <form onSubmit={submitHandler} encType='multipart/form-data'>

                                    <div class="form-row">
                                        <div class="col">
                                            <label for="inputFirstName">First Name</label>
                                            <input type="text"
                                                class="form-control"
                                                name='first_name'
                                                placeholder="First name"
                                                value={first_name}
                                                onChange={onChange}
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
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div class="form-row mt-2">
                                        <div class="form-group col-md-12">
                                            <label for="inputZip">Address</label>
                                            <input type="text"
                                                class="form-control"
                                                name='address'
                                                value={address}
                                                onChange={onChange}
                                                id="inputAddress" />
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
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                        <div class="col">
                                            <label for="inputGender">Gender</label>
                                            <select id="inputState"
                                                name='gender'
                                                placeholder=" Male/Female"
                                                default="male"
                                                value={gender}
                                                onChange={onChange}
                                                class="form-control">
                                                <option selected>Choose...</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div class="form-row mt-2">
                                        <div class="form-group col-md-6">
                                            <label for="inputEmail4">Email</label>
                                            <input type="email"
                                                class="form-control"
                                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                                                name='email'
                                                placeholder=" E-mail Address"
                                                value={email}
                                                onChange={onChange}
                                                required
                                                id="inputEmail4" />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="inputPassword4">Password</label>
                                            <input type="password"
                                                class="form-control"
                                                name='password'
                                                placeholder=" Password"
                                                value={password}
                                                onChange={onChange}
                                                required
                                                id="inputPassword4" />
                                        </div>
                                    </div>

                                    <div class='form-group'>
                                        <label for='avatar_upload'>Avatar</label>
                                        <div class='d-flex align-items-center'>
                                            <div>
                                                <figure class='avatar mr-3 item-rtl'>
                                                    <img src={avatarPreview}
                                                        class='rounded-circle custom-avator'
                                                        alt='image' />
                                                </figure>
                                            </div>
                                            <div class='custom-file'>
                                                <input type='file'
                                                    name='avatar'
                                                    class='custom-file-input'
                                                    accept="images/*"
                                                    onChange={onChange}
                                                    id='customFile' />
                                                <label class='custom-file-label' for='customFile'>
                                                    Choose Avatar
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" class="btn btn-primary"
                                        style={{ width: '100%', height: '40px' }}
                                        disabled={loading ? true : false}
                                    >Sign Up</button>
                                </form>

                                <div class="custom-bottem mt-2">
                                    <span>Already a member? </span><span><a href="/login" style={{ textDecoration: 'none' }} >Sign
                                        In</a>
                                    </span>
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

export default Register
