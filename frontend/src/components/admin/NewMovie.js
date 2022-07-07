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
import { newMovie, clearErrors } from '../../actions/movieActions' 
import { NEW_MOVIE_RESET } from '../../constants/movieConstants'

import '../style/anuka.css'

const NewMovie = ({ history }) => {

    const [name, setName] = useState('');
    const [cast, setCast] = useState('');
    const [description, setDescription] = useState('');
    const [ticketPrice, setTicketPrice] = useState(0);
    const [theater, setTheater] = useState('');
    const [noOfAvailableSeats, setNoOfAvailableSeats] = useState(0);

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    const theaters = [
        'Savoy Wellawatte',
        'Nikado Kadawatha',
        'Regal Gampaha',
        'Sigiri Veyangoda'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newMovie);

    useEffect(() => {

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if(success) {
            history.push('/admin/movies');
            alert.success('Movie created successfully');
            dispatch({ type: NEW_MOVIE_RESET})
        }
    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('cast', cast);
        formData.set('description', description);
        formData.set('ticketPrice', ticketPrice);
        formData.set('theater', theater);
        formData.set('noOfAvailableSeats', noOfAvailableSeats);
        

        images.forEach(image => {
            formData.append('images', image)
        })

        
        dispatch(newMovie(formData))
        
    }

    
    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })

    }
    


    return (
        <Fragment>
            <MetaData title={'New Movie'} />

            <Fragment>
            <Header/>
            <section className="container_yo">
                    <Admin_nav/>
                </section>
                <section className="container55555">
                <div className="myForm">
                    <form onSubmit={submitHandler} encType='multipart/form-data'>

                        <center><h1 className="h1addad">Add New Movie</h1></center><br/>

                        <div className="labelInput">
                            <label for="name_field" className="formLabel">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="formInput"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <br/>
                        
                        <div className="labelInput">
                        <label for="cast_field" className="formLabel">Cast</label>
                            <input
                                type="text"
                                id="cast_field"
                                className="formInput"
                                value={cast}
                                onChange={(e) => setCast(e.target.value)}
                            />
                        </div>
                        <br/>

                        <div className="labelInput" style={{height:"90px"}}>
                            <label for="description_field" className="formLabel">Description</label>
                            <textarea 
                                id="description_field" 
                                className="formInputTextArea" 
                                value={description} onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <br/>
                        
                        <div className="labelInput">
                            <label for="ticketPrice_field" className="formLabel">Ticket Price (Rs.)</label>
                            <input
                                type="number"
                                id="ticketPrice_field"
                                className="formInput"
                                value={ticketPrice}
                                onChange={(e) => setTicketPrice(e.target.value)}
                            />
                        </div>
                        <br/>

                        <div className="labelInput">
                            <label for="theater_field" className="formLabel">Theater</label>
                            <select id="theater_field" className="formInput" value={theater} onChange={(e) => setTheater(e.target.value)}>
                                {theaters.map(theater => (
                                    <option key={theater} value={theater}>{theater}</option>
                                ))}
                                
                            </select>
                        </div>

                        <div className="labelInput">
                            <label for="noOfAvailableSeats_field" className="formLabel">No Of Available Seats (Rs.)</label>
                            <input
                                type="number"
                                id="noOfAvailableSeats_field"
                                className="formInput"
                                value={noOfAvailableSeats}
                                onChange={(e) => setNoOfAvailableSeats(e.target.value)}
                            />
                        </div>
                        <br/>


                        <div className="imageUpload">
                            <label className="hghghhgf">Upload Images</label><br /><br />

                            <div>
                                <input
                                    type='file'
                                    name='movie_images'
                                    id='customFile'
                                    onChange={onChange}
                                    multiple
                                    accept="image/*"
                                />

                                <label for='customFile'></label>
                            </div>

                            {imagesPreview.map(img => (
                                <img src={img} key={img} alt="Images Preview" width="30%" height="200px"/>
                            ))}
                            
                            <br/>

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

export default NewMovie
