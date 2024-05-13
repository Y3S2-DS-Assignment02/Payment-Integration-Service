const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);
const Payment = require("../models/Payment");
// const Learner = require('../Models/Payment');
const {sendEmail_Payments} = require('./External/emailService')
const {sendSMS_Payments} =require('./External/smsService');
const {GetUserDetailsById} = require('./External/userService')

exports.createPayment = async (items) => {
    try {

        console.log("s",items) 

        const { studentId } = items[0];
        
        
        
        console.log("studentId",studentId)
 const userDetails = await GetUserDetailsById(studentId);
        const {  email, phoneNumber } = userDetails;
        console.log("userDetails",userDetails)
        
        const totalAmount = items.reduce((acc, item) => {
            return acc + item.courseFee;
        }, 0) * 100;

        if (totalAmount < 50) {
            throw new Error("Total amount must be at least 50 cents.");
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: items.map(item => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.courseName,
                            metadata: {
                                courseId: item.courseId 
                            }
                        },
                        unit_amount: Math.round(item.courseFee * 100), 
                    },
                    quantity: 1
                };
            }),
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        });

        const payment = new Payment({
            courseName: items[0].courseName, 
            courseId: items[0].courseId, 
            studentId: items[0].studentId, 
           
            courseFee: totalAmount / 100, 
            date: new Date() 
        });

        // Save the payment document to the database
        await payment.save();

        console.log("Payment document saved:", payment);

        // Log email and phoneNumber
        console.log("User email:", email);
        console.log("User phoneNumber:", phoneNumber);
        await sendEmail_Payments(email)
        await sendSMS_Payments(phoneNumber)
        return session.url;
        
       
    } catch(error) {
        console.error("Error:", error);
        throw error;
    }
};

exports.getAllPayments = async () => {
    try {
        const payments = await Payment.find();
        return payments;
    } catch (error) {
        throw new Error('Error retrieving payments');
    }
};
