import React, { Fragment, useState, useEffect } from 'react'

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import MetaData from '../layout/MetaData'

import '../style/login.css'
import '../style/profile.css'
import '../style/updateProfile.css'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const UpdateProfile = ({ history }) => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [birthday, setBirthday] = useState('')
    const [address, setAddress] = useState('')
    const [phone_no, setPhoneNo] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user);

    useEffect(() => {

        if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setGender(user.gender);
            setBirthday(user.birthday);
            setAddress(user.address);
            setPhoneNo(user.phone_no);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('User updated successfully')
            dispatch(loadUser());

            history.push('/me')

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, alert, error, history, isUpdated])


    const submitHandler = (e) => {

        e.preventDefault();
        const formData = new FormData();

        formData.set('first_name', first_name);
        formData.set('last_name', last_name);
        formData.set('gender', gender);
        formData.set('birthday', birthday);
        formData.set('address', address);
        formData.set('phone_no', phone_no);
        formData.set('email', email);
        formData.set('avatar', avatar);

        dispatch(updateProfile(formData))
    }


    const onChange = e => {

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }


    return (
        <Fragment>
            <MetaData title={'Update My Profile'} />
            <Header />
            <div class="container  min-vh-100">
                <div class="row hero-section">

                </div>
                <div class="row mt-5 mb-5">
                    <div class="col-md-2"></div>
                    <div class="col-md-8">

                        <div class="card ">

                            <div class="card-body">
                                <h2 class="mb-4">Update My Profile</h2>

                                <form onSubmit={submitHandler} encType='multipart/form-data'>

                                    <div class="form-row">
                                        <div class="col">
                                            <label for="inputFirstName">First Name</label>
                                            <input type="text"
                                                class="form-control"
                                                name='first_name'
                                                placeholder="First name"
                                                value={first_name}
                                                onChange={(e) => setFirstName(e.target.value)}
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
                                                onChange={(e) => setLastName(e.target.value)}
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
                                                onChange={(e) => setAddress(e.target.value)}
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
                                                onChange={(e) => setPhoneNo(e.target.value)}
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
                                                onChange={(e) => setGender(e.target.value)}
                                                class="form-control">
                                                <option selected>Choose...</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div class='form-group mt-2'>
                                        <label for='avatar_upload'>Avatar</label>
                                        <div class='align-items-center custom-margin-top'>
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
                                    >Update</button>
                                </form>

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

export default UpdateProfile
