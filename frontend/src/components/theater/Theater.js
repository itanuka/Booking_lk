import React from 'react'
import { Link } from 'react-router-dom'

const Theater = ({ theater }) => {
    return (

        <div className="card" style={{width:"18rem"}}>
          <img src={theater.images[0].url} className="card-img-top" width="100%" height="200px" alt="..."/>
          <div className="card-body">
            <Link to={`/theater/${theater._id}`}>{theater.description}</Link><br/>
        
            <Link to={`/theater/${theater._id}`} id="view_btn" className="btn btn-primary" >View More Details</Link>
          </div>  
        </div>





        // <div>
        //     <img
        //     class="card-img-top mx-auto"
        //     src={theater.images[0].url}
        //     />
        //     <div>
        //         <h5>
        //             <Link to={`/theater/${theater._id}`}>{theater.description}</Link>
        //         </h5>
        //         <Link to={`/theater/${theater._id}`}>View Details</Link>
        //     </div>
        // </div>
    )
}

export default Theater
