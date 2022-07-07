const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    Fullname: { type: String, required: true },
    Paymentamount: { type: String, required: true },
    CreditCardNumber: { type: String, required: true },
    CVVNumber: { type: String, required: true },
    Contactno: { type: String, required: true },
    Email: { type: String, required: true },
}, {
    timestamps: true,
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;