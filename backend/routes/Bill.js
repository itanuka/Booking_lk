const router = require("express").Router();
let Payment = require("../models/Bill.model");

router.route("/").get((req, res) => {
    Payment.find()
        .then((Payment) => res.json(Payment))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {

    const Fullname = req.body.Fullname;
    const Paymentamount = req.body.Paymentamount;
    const CreditCardNumber = req.body.CreditCardNumber;
    const CVVNumber = req.body.CVVNumber;
    const Contactno = req.body.Contactno;
    const Email = req.body.Email;

    const newPayment = new Payment({
       
        Fullname,
        Paymentamount,
        CreditCardNumber,
        CVVNumber,
        Contactno,
        Email,
    });

    newPayment
        .save()
        .then(() => res.json("Payment Added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Payment.findById(req.params.id)
        .then((Payment) => res.json(Payment))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Payment.findById(req.params.id)
        .then((Payment) => {
            
            Payment.Fullname = req.body.Fullname;
            Payment.Paymentamount = req.body.Paymentamount;
            Payment.CreditCardNumber = req.body.CreditCardNumber;
            Payment.CVVNumber = req.body.CVVNumber;
            Payment.Contactno = req.body.Contactno;
            Payment.Email = req.body.Email;

            Payment.save()
                .then(() => res.json("Payment updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Payment.findByIdAndDelete(req.params.id)
        .then(() => res.json("Payment deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;