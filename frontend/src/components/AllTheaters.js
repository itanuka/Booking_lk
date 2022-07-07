import React, { Fragment, useEffect } from 'react'
import './style/anuka.css'

import MetaData from './layout/MetaData'
import Theater from './theater/Theater'
import Loader from './layout/Loader'

import Header from './layout/Header';
import Footer from './layout/Footer';
import AdminFooter from './layout/AdminFooter';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getTheaters } from '../actions/theaterActions'


const AllTheaters = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, theaters, error, theatersCount } = useSelector(state => state.theaters)

    useEffect(() => {
        if(error) {
            return alert.error(error)

        }
        dispatch(getTheaters());

    }, [dispatch, alert, error])
    return (
        
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Best Theaters from us'}/>
                    <Header />
                    <link
                                rel="stylesheet"
                                type="text/css"
                                href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                                />
                                <link
                                rel="stylesheet"
                                type="text/css"
                                href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                            />
                                <link
                                href="//db.onlinewebfonts.com/c/157c6cc36dd65b1b2adc9e7f3329c761?family=Amazon+Ember"
                                rel="stylesheet"
                                type="text/css"
                                />
<div className="containerMenu" style={{margin:"100px"}}>
                    <h1>Our Theaters</h1>
                    
                    <section id="theaters">
                        <div style={{display:"flex", flexDirection:"row", justifyContent:'space-between'}}>
                            {theaters && theaters.map(theater => (
                                <Theater  key={theater._id} theater={theater}/>

                            ))}
                        </div>
                    </section>
                    </div>
                </Fragment>
            )}
            <Footer/>
        </Fragment>
    )
}

export default AllTheaters
