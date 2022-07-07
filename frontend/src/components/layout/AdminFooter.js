import React,{Fragment} from 'react'

//import "../../com/fontAwesomeIcones"
import '../style/adminFooter.css'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faInstagram,faWhatsapp,faTwitter,faYoutube,faTiktok,faPinterest } from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'

const AdminFooter = () => {
    return (
        <Fragment>
            <br/> <br/> <br/> <br/>
            <footer>
                <hr/>
            <p className="copyright">Nue Nimble Web Solutions <FontAwesomeIcon icon={faCopyright}/> 2021 - All Rights Reserved</p>
        </footer>
        </Fragment>
    )
}

export default AdminFooter
