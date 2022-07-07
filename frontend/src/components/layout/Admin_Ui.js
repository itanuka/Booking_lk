import React,{Fragment} from 'react'

import MetaData from '../layout/MetaData';
import Admin_nav from '../layout/AdminNav';
import Header from "../layout/Header";
import '../style/home.css';


const Home = () => {
    return (
        <Fragment>
            <MetaData/>
            <Header/>
            <section className="container_yo">
                <Admin_nav/>
            </section>
        </Fragment>
    )
}

export default Home
 