import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import swal from '@sweetalert/with-react'
import DatePicker from 'react-datepicker';

import MetaData from '../layout/MetaData';

import Header from "../layout/Header";
import Loader from '../layout/Loader'

export default class EditStock extends Component {
    constructor(props) {
        super(props);

        this.onChangeFullname = this.onChangeFullname.bind(this);
        this.onChangePaymentamount = this.onChangePaymentamount.bind(this);
        this.onChangeCreditCardNumber = this.onChangeCreditCardNumber.bind(this);
        this.onChangeCVVNumber = this.onChangeCVVNumber.bind(this);
        this.onChangeContactno = this.onChangeContactno.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {

            Fullname: "",
            Paymentamount: "",
            CreditCardNumber: "",
            CVVNumber:"",
            Contactno: "",
            Email:"",
            Payment: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/Payment/' + this.props.match.params.id)
            .then(response => {
                this.setState({

                    Fullname: response.data.Fullname,
                    Paymentamount: response.data.Paymentamount,
                    CreditCardNumber: response.data.CreditCardNumber,
                    CVVNumber: response.data.CVVNumber,
                    Contactno: response.data.Contactno,
                    Email: response.data.Email,
                    
                    
                })
            })
            .catch(function(error) {
                console.log(error);
            })

        axios.get('http://localhost:4000/Payment/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        Payment: response.data.map(Payment => Payment.Fullname),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
           

    }


//set the Fullname

onChangeFullname(e) {
    this.setState({
        Fullname: e.target.value,
    });
}


//set Paymentamount
onChangePaymentamount(e) {
    this.setState({
        Paymentamount: e.target.value,
    });
}

//set CreditCardNumber
onChangeCreditCardNumber(e) {
    this.setState({
        CreditCardNumber: e.target.value,
    });
}

//set CVVNumber
onChangeCVVNumber(e) {
    this.setState({
        CVVNumber: e.target.value,
    });
}

//set Contactno
onChangeContactno(e) {
    this.setState({
        Contactno: e.target.value,
    });
}

//set Email
onChangeEmail(e) {
    this.setState({
        Email: e.target.value,
    });
}

    onSubmit(e) {
        e.preventDefault();

        const { Contactno, Paymentamount, CreditCardNumber, CVVNumber } = this.state;

        const cup = /^[0-9\b]+$/;
        const cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        
        if (!cup.test(String(Contactno))) {
            swal(
                "Invalid Contact no !",
                "Contact no Should be number!",
                "error"
            );

        } else if (!cup.test(String(Paymentamount))) {
            swal(
                "Invalid Payment Amount!",
                "Payment Amount Should be number!",
                "error"
            );

        }else if(!cardno.test(String(CreditCardNumber))){
            swal(
		        "Invalid Credit Card Number..!",
		        "Card Number Should be a number & Credit Card No.[Starting with 4 length 13 or 16 digits (Visa).!",
		        "error"
	        );

        } else {

            const Payment = {

                Fullname: this.state.Fullname,
                Paymentamount: this.state.Paymentamount,
                CreditCardNumber: this.state.CreditCardNumber,
                CVVNumber: this.state.CVVNumber,
                Contactno: this.state.Contactno,
                Email: this.state.Email,
            };

            console.log(Payment);

            axios
                .post('http://localhost:4000/Payment/update/' + this.props.match.params.id, Payment)
                .then((res) => console.log(res.data));

            swal({
                title: "Done!",
                text: "Edit Successfully!",
                icon: "success",
                button: "Okay!",
            }).then((value) => {
                swal((window.location = "/listbill/"));
            });
        }

    }

    render() {
        return (<div  >
            <MetaData title ={'Payment Payments'}/>
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
                            
                                <Header/>
                
                                <section className="container55555">
                                    
            <div class = "myForm ">
             
            <div div class = "myformstyle" >
            <div className = "card-body" >
            <div className = "col-md-8 mt-4 mx-auto" > 
            <h3 className = "text-center" > 
            <font face = "Comic sans MS" size = "6"className="h3544" > Update Payment </font>
            </h3 > <br></br>
            
            <br></br>
            
             <form onSubmit = { this.onSubmit } >

             <div className = "form-group" >
            <label >Card Holder Full Name </label> 
            <input type = "text"
            placeholder = "Full Name"
            required className = "form-control"
            value = { this.state.Fullname }
            onChange = { this.onChangeFullname }
            /> 
            </div >  

            <div className = "form-group" >
            <label > Payment Amount(Rs) </label> 
            <input type = "text"
           required className = "form-control"
            placeholder = "Payment Amount (xxx.xx)"
            value = { this.state.Paymentamount }
            onChange = { this.onChangePaymentamount }/> 
            </div >  

            <div className = "form-group" >
            <label > Credit Card Number(visa) </label> 
            <input type = "text"
            required className = "form-control"
            placeholder = "CreditCardNumber"
            value = { this.state.CreditCardNumber }
            onChange = { this.onChangeCreditCardNumber }/> 
            </div >  


            <div className = "form-group" >
            <label > CVV Number </label> 
            <input type = "password"
            required className = "form-control"
            placeholder = "CVV Number (xxx)"
            value = { this.state.CVVNumber }
            onChange = { this.onChangeCVVNumber }/> 
            </div >  

            <div className = "form-group" >
            <label > Contact No </label> 
            <input type = "text"
            required className = "form-control"
            placeholder = "Contact No"
            value = { this.state.Contactno }
            onChange = { this.onChangeContactno }/> 
            </div > 

            <div className = "form-group" >
            <label > Email </label> 
            <input type = "Email"
            required className = "form-control"
            placeholder = "Email"
            value = { this.state.Email }
            onChange = { this.onChangeEmail }/> 
            </div > 
            
            
            <div className = "form-group" >
            <input type = "submit"
            value = "Add Payment Payment"
            className = "btn btn-primary" />
            </div>{" "} </form >  </div> </div > </div>
             </div ><br/> <br/>  </section></div>
        )
    }
}