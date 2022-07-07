import React from 'react'
import { Link } from 'react-router-dom'

const Movie = ({ movie }) => {
    return (

        <div className="card" style={{width:"18rem"}}>
          <img src={movie.images[0].url} className="card-img-top" width="100%" height="200px" alt="..."/>
          <div className="card-body">
            <Link to={`/movie/${movie._id}`}>{movie.name}</Link>
            <p className="card-text">Rs.{movie.smallPrice}</p>
            <Link to={`/movie/${movie._id}`} id="view_btn" className="btn btn-primary" >View More Details</Link>
          </div>  
        </div>


        // <div>
        //     <div>
        //         <img
        //         class="card-img-top mx-auto"
        //         src={movie.images[0].url}
        //         />
        //         <div>
        //             <h5>
        //                 <Link to={`/movie/${movie._id}`}>{movie.name}</Link>
        //             </h5>
                    
        //             <p >Rs.{movie.smallPrice}</p>
        //             <Link to={`/movie/${movie._id}`} id="view_btn" >View Details</Link>
        //         </div>
        //     </div>
        // </div> 
    )
}

export default Movie
