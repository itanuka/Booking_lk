import React, { Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import Swal from 'sweetalert2'
import QRCode from 'qrcode.react'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import AdminFooter from '../layout/AdminFooter';
import Admin_nav from '../layout/AdminNav';

import "react-datetime/css/react-datetime.css";
import '../style/home.css';
import '../style/adminFeedback.css'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminMovies, deleteMovie, clearErrors } from '../../actions/movieActions' 
import { DELETE_MOVIE_RESET } from '../../constants/movieConstants'

/*
import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; import
'mdbreact/dist/css/mdb.css';
*/

const MoviesList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, movies } = useSelector(state => state.movies);
    const { error: deleteError, isDeleted } = useSelector(state => state.movie)

    useEffect(() => {
        dispatch(getAdminMovies());

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if(isDeleted) {
            alert.success('Movie deleted successfully');
            history.push('/admin/movies');
            dispatch({ type: DELETE_MOVIE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setMovies = () => {
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
                    label: 'Cast',
                    field: 'cast',
                    sort: 'asc'
                },
                {
                    label: 'Ticket Price (Rs.)',
                    field: 'ticketPrice',
                    sort: 'asc'
                },

                {
                    label: 'Theater',
                    field: 'theater',
                    sort: 'asc'
                },
                {
                    label: 'QR Code',
                    field: 'qrcode',
                    sort: 'asc'
                },
                {
                    label: 'No Of Available Seats',
                    field: 'noOfAvailableSeats',
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

        movies.forEach(movie => {
            data.rows.push({
                id: movie._id,
                name: movie.name,
                cast: movie.cast,
                ticketPrice: `${movie.ticketPrice}`,
                theater: `${movie.theater}`,
                noOfAvailableSeats: `${movie.noOfAvailableSeats}`,
                qrcode:
                <QRCode
                    id='qrcode'
                    value={`${movie._id}:${movie.name}:${movie.cast}:${movie.ticketPrice}:${movie.theater}`}
                />,
                
                actions:
                <Fragment>
                    <Link to={`/admin/movie/${movie._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteMovieHandler(movie._id)}>
                    <i className="fas fa-trash-alt"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteMovieHandler = (id) => {
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
                dispatch(deleteMovie(id))
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
                <MetaData title={'All Movies'} />
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
                    

                <h1 className="h12">Movies</h1><br/><br/>
                    <Link to="/admin/movie">
                        <button className="button565465847655654">
                            <div className ="learn-more">
                            <span class="circle" aria-hidden="true">
                            <span class="icon arrow"></span>
                            </span>
                            <span class="button-text">Add Movie</span>
                            </div>

                        </button>
                    </Link>
                    <br/><br/>

                    {loading ? <Loader /> :(
                        <MDBDataTable
                            data={setMovies()}
                            bordered
                            striped
                            hover
                        />
                    )}
                    </section>
                    
                </Fragment>
            </Fragment>
        
    )
}

export default MoviesList
