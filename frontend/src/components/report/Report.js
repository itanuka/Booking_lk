import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";


//Payment report

const Payment = (props) => ( 
    <tr>
    
        <td> {props.Payment.Fullname} </td > { " " } 
        <td > { props.Payment.Paymentamount } </td> 
        <td > { props.Payment.Contactno } </td>{" "} 
        <td > { props.Payment.Email } </td>{" "} 
    
     </tr>
);



export default class SupplierList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Payments: []
        };
    }

    componentDidMount() {
            {
                axios
                    .get("http://localhost:4000/Payment/")
                    .then((response) => {
                        this.setState({ Payments: response.data });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            
           
    }

    getPosts() {
            {
                axios
                    .get("http://localhost:4000/Payment/")
                    .then((response) => {
                        this.setState({ Payments: response.data });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }   

    }


    PaymentList() {
        return this.state.Payments.map((currentPayment) => {
            return ( <
                Payment Payment = { currentPayment }
                deletePayment = { this.deletePayment }
                key = { currentPayment._id }
                />
            );
        });
    }

    print() {
        window.print();
    }

    render() {
        return ( 
            <div className = "container" >    
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
             

            <br></br>

<br></br>
{/* ------------------------------------------------------------------------------- */}
<div  className = "col-9 mt-1 mb-1">
            <h3 > All Payment Payment  </h3>
             </div > 
            <table class = "table table-bordered table-white" >
            <thead className = "thead-light" >
                <tr >
            
                    <th> Card Holder Full Name </th >  
                    <th> Payment Amount(Rs) </th >
                    <th > Contact Number (visa) </th>
                    <th > Email </th>
          
                </tr>
             </thead > 
            <tbody >  {
                this.state.Payments.map((props) => ( 
                    <tr key = { props.id }>
                    <td> {props.Fullname} </td > 
                    <td > { props.Paymentamount } </td> 
                    <td > { props.Contactno } </td>
                    <td > { props.Email } </td>
                     </ tr >))}  
            </tbody>
            </table > 

<br></br>
{/* ---------------------------------------------------- */}


                        <div style = {{ float: "right" }}>
                        <a href = ""onClick = {() => {this.print();}} > 
                        <Button class = "btn btn-success" > Print </Button> </a > 
                        </div> 

                  </div >     
        );
    }
}