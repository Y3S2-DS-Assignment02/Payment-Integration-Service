const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    courseFee: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now 
    }
});


const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
