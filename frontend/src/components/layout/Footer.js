import React, { Fragment } from 'react'
import '../style/footer.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faWhatsapp, faTwitter, faYoutube, faTiktok, faPinterest } from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    return (
        <Fragment>
            <div class="container-fluid bg-dark align-items-end text-light mt-auto">
                <section class="row ">

                    <div class="col-3">
                        <h2 class="mt-2">About Us</h2>
                        <div>
                            <p class="lead">We are the Sri Lankan No 01<br /> Movies tickets booking web site.<br /> Since 99'<br />
                                we provide relaible service.
                            </p>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <h5 class="mt-3 ">Address</h5>
                        <div class="mt-3 " style={{ color: 'rgb(219, 203, 203)' }}>
                            <p>No25,</p>
                            <p>Main-Street,</p>
                            <p> Matara.</p>

                        </div>
                    </div>

                    <div class="col-md-3">
                        <h5 class="mt-3">Telephone</h5>
                        <div class="mt-3" style={{ color: 'rgb(219, 203, 203)' }}>
                            <p>077-3851427</p>
                            <p>077-4815358</p>
                            <p>07213658721</p>

                        </div>
                    </div>

                    <div class="col-md-3">
                        <h5 class="mt-3 ">Follow Us</h5>
                        <div class="footer-right mt-5">
                            <i class="fab fa-twitter custome-icon"></i>
                            <i class="fab fa-facebook custome-icon"></i>
                            <i class="fa-brands fa-whatsapp custome-icon"></i>
                        </div>
                        <div class=" text-black footer-section mt-5">
                            <small>&copy; 2022 | All RIGHTS RESERVED</small><br />
                            <small>Booking.lk</small>
                        </div>
                    </div>

                </section>
            </div>
        </Fragment>
    )
}

export default Footer
