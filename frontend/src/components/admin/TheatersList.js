import React, { Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'


import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

//seweet alert ekta delete ekata adalawa
import Swal from 'sweetalert2'
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import AdminFooter from '../layout/AdminFooter';
import Admin_nav from '../layout/AdminNav';


import "react-datetime/css/react-datetime.css";
import '../style/home.css';
import '../style/adminFeedback.css'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminTheaters, deleteTheater, clearErrors } from '../../actions/theaterActions' 
import { DELETE_THEATER_RESET } from '../../constants/theaterConstants'

/*
import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; import
'mdbreact/dist/css/mdb.css';
*/

const TheatersList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, theaters } = useSelector(state => state.theaters);
    const { error: deleteError, isDeleted } = useSelector(state => state.theater)

    useEffect(() => {
        dispatch(getAdminTheaters());

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if(isDeleted) {
            alert.success('Theater deleted successfully');
            history.push('/admin/theaters');
            dispatch({ type: DELETE_THEATER_RESET })
        }
    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setTheaters = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Address',
                    field: 'address',
                    sort: 'asc'
                },
                {
                    label: 'City',
                    field: 'city',
                    sort: 'asc'
                },
                {
                    label: 'Phone No',
                    field: 'phoneNo',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []

        }

        theaters.forEach(theater => {
            data.rows.push({
                id: theater._id,
                name: theater.name,
                address: theater.address,
                city: theater.city,
                phoneNo: theater.phoneNo,
                email: theater.email,
                actions:
                <Fragment>
                    <Link to={`/admin/theater/${theater._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteTheaterHandler(theater._id)}>
                    <i className="fas fa-trash-alt"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteTheaterHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTheater(id))
              Swal.fire(
                  
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }
    return (
        
            <Fragment>
                <MetaData title={'All Theaters'} />
                                
                                    
                                        <script src="https://kit.fontawesome.com/48ca456f8a.js" ></script>
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

                <Fragment>
                <Header/>
            <section className="container_yo">
                    <Admin_nav/>
                </section>
                <section className="container55555">
                    <h1 className="h12">Theaters</h1><br/><br/>
                    <Link to="/admin/theater">
                        <button className="button565465847655654">
                            <div className ="learn-more">
                            <span class="circle" aria-hidden="true">
                            <span class="icon arrow"></span>
                            </span>
                            <span class="button-text">Add Theaters</span>
                            </div>

                        </button>
                    </Link>
                    <br/><br/>

                    
                    
                    {loading ? <Loader /> :(
                        <MDBDataTable
                            data={setTheaters()}
                            bordered
                            striped
                            hover
                            fixed

                        />
                    )}

                    
                    
                    </section>
                    
                </Fragment>

            </Fragment>
        
    )
}

export default TheatersList
