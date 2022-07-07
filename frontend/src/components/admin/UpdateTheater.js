import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import AdminFooter from '../layout/AdminFooter';
import Admin_nav from '../layout/AdminNav';

import "react-datetime/css/react-datetime.css";
import '../style/home.css';
import '../style/adminFeedback.css'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateTheater, getTheaterDetails, clearErrors } from '../../actions/theaterActions' 
import { UPDATE_THEATER_RESET } from '../../constants/theaterConstants'

import '../style/anuka.css'

const UpdateTheater = ({ match, history }) => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phoneNo, setPhoneNo] = useState('')
    const [email, setEmail] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, theater } = useSelector(state => state.theaterDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.theater);

    const theaterId = match.params.id;

    useEffect(() => {

        if(theater && theater._id !== theaterId) {
            dispatch(getTheaterDetails(theaterId));
        }else {
            setName(theater.name);
            setAddress(theater.address);
            setCity(theater.city);
            setPhoneNo(theater.phoneNo);
            setEmail(theater.email);
        }

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }

        if(isUpdated) {
            history.push('/admin/theaters');
            alert.success('Theater updated successfully');
            dispatch({ type: UPDATE_THEATER_RESET})
        }
    }, [dispatch, alert, error, isUpdated, history, updateError, theater, theaterId])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('address', address);
        formData.set('city', city);
        formData.set('phoneNo', phoneNo);
        formData.set('email', email);

       dispatch(updateTheater(theater._id, formData))
    }

    return (
        <Fragment>
            <MetaData title={'Update Theater'} />

            <Fragment>
            <Header/>
            <section className="container_yo">
                    <Admin_nav/>
                </section>
                <section className="container55555">
                <div className="myForm">
                    <form onSubmit={submitHandler} encType='multipart/form-data'>
                        
                    <center><h1>Update Theater Details</h1></center><br/>
                        
                        <div className="labelInput"> 
                            <label for="name_field" className="formLabel">Name</label>
                            <input 
                                type="text"
                                id="name_field" 
                                className="formInputTheater" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <br/>

                        <div className="labelInput">

                        <label for="address_field" className="formLabel">Address</label>
                            <textarea
                                id="address_field"
                                className="formInputTextArea"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                        </div>
                        <br/><br/><br/><br/>

                        <div className="labelInput">    
                        <label for="city_field" className="formLabel">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="formInputTheater"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="labelInput">

                            <label for="phoneNo_field" className="formLabel">Phone No</label>
                            <input
                                type="number"
                                id="phoneNo_field"
                                className="formInputTheater"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>
                        <div className="labelInput">

                            <label for="email_field" className="formLabel">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="formInputTheater"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>


                        <div className="imageUpload">
                        
                            <button
                                id="login_button"
                                type="submit"
                                className="buttonSumbit"
                                disabled={loading ? true : false}
                            >
                                UPDATE
                            </button>
                        </div>
                    
                    </form>
                </div>

                </section>
            </Fragment>
        </Fragment>
    )
}

export default UpdateTheater
