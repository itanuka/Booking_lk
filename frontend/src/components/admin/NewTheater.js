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
import { newTheater, clearErrors } from '../../actions/theaterActions' 
import { NEW_THEATER_RESET } from '../../constants/theaterConstants'

import '../style/anuka.css'

const NewTheater = ({ history }) => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phoneNo, setPhoneNo] = useState('')
    const [email, setEmail] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newTheater);

    useEffect(() => {

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if(success) {
            history.push('/admin/theaters');
            alert.success('Theater created successfully');
            dispatch({ type: NEW_THEATER_RESET})
        }
    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('address', address);
        formData.set('city', city);
        formData.set('phoneNo', phoneNo);
        formData.set('email', email);

        dispatch(newTheater(formData))
    
    }


    return (
        <Fragment>
            <MetaData title={'New Theater'} />

            <Fragment>
            <Header/>
            <section className="container_yo">
                    <Admin_nav/>
                </section>
                <section className="container55555">
                <div className="myForm">
                    <form onSubmit={submitHandler} encType='multipart/form-data'>

                        <center><h1 className="h1addad">Add New Theater</h1></center><br/>

                        <div className="labelInput" style={{height:"90px"}}>

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
                                CREATE
                            </button>
                        </div>
                                
                    
                    </form>

                </div>

                </section>
                
            </Fragment>
        </Fragment>
    )
}

export default NewTheater
