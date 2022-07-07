import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

import MetaData from '../layout/MetaData';

import Header from "../layout/Header";
import Loader from '../layout/Loader'


const Payment = (props) => ( 
    <tr>
    <td> {props.Payment.Fullname} </td > { " " } 
    <td > { props.Payment.Paymentamount } </td> 
    <td > { props.Payment.Contactno } </td>{" "} 
    <td > { props.Payment.Email } </td>{" "} 
    <td >
    <Link to = { "/edit/" + props.Payment._id } > Edit </Link> |{" "} <a href = " "onClick = {() => {props.deletePayment(props.Payment._id);}} >Delete { " " } </a>{" "} 
    </td > { " " }
     </tr>
);

export default class PaymentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Payments: [],
        };
    }
   
    componentDidMount(id) {
        axios
            .get("http://localhost:4000/Payment/" )
            .then((response) => {
                this.setState({ Payments: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getPosts() {
        axios
            .get("http://localhost:4000/Payment/" )
            .then((response) => {
                this.setState({ Payments: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deletePayment(id) {
        if (window.confirm("Are you sure?")) {
            axios.delete("http://localhost:4000/Payment/" + id).then((response) => {
                console.log(response.data);
            });

            this.setState({
                Payments: this.state.Payments.filter((el) => el._id !== id),
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

    filterData(Payment, searchKey) {
        this.setState({
            Payments: this.state.Payments.filter((el) => (el.Fullname = searchKey)),
        });
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;

        axios.get("http://localhost:4000/Payment/").then((response) => {
            const resultt = response.data;
            const result = resultt.filter((props) =>
                props.Fullname.includes(searchKey)
            );

            this.setState({ Payments: result });
        });
    };

    print() {
        window.print();
    }

    render() {
        return ( 
            <div>
            
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
                               
                
                                <section className="container555424224255">
                                        <div  >
                                        <div className = "container" >
                                                </div> <br/ >
                                                <div className = "row" >
                                                <div div className = "col-lg-9 mt-2 mb-2">
                                                <h3 > All Payment Details  </h3>
                                                </div > 
                                                <br></br>

                                                <br></br>
                                                <br></br>
                                                
                                                <div className = "col-lg-3 mt-1 mb-2" >
                                                <input className = "form-control" type = "search" placeholder = "Search by First name" name = "searchQuery" onChange = { this.handleSearchArea } >
                                                </input>
                                                </div > 
                                                </div>
                                                
                                                <table class = "table table-bordered table-white" >
                                                <thead className = "thead-light" >
                                                <tr >
                                                
                                                    <th> Card Holder Full Name </th >  
                                                    <th> Payment Amount(Rs) </th > 
                                                    <th > Contact Number  </th>
                                                    <th > Email </th><th> Actions </th >  
                                                </tr> </thead > 
                                                <tbody >  {
                                                    this.state.Payments.map((props) => ( 
                                                        <tr key = { props.id }>
                                                        <td> {props.Fullname} </td >  
                                                        <td > { props.Paymentamount } </td>
                                                        <td > { props.Contactno } </td>
                                                        <td > { props.Email } </td>
                                                        <td >
                                                        < Link to = { "/editbill/" + props._id } >  <Button data-inline ="true" variant = "warning btn-sm" > Edit </Button> |</Link > 
                                                        <a href = ""onClick = {() => {this.deletePayment(props._id);}} >  
                                                        <Button data-inline ="true" variant = "danger btn-sm" > Delete </Button> </a > 
                                                        </td>  </ tr >))}  </tbody> </table > 
                                                        </div>
                                            </section>   
            </div >
                        
        );
    }
}