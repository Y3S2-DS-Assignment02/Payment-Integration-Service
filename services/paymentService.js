// paymentService.js

const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);
const Payment = require("../models/Payment");

exports.createPayment = async (items) => {
    try {
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
            success_url: "http://localhost:3000/dashboard",
            cancel_url: "http://localhost:3000/cancel"
        });

        const payment = new Payment({
            courseName: items[0].courseName, // Assuming all items have the same courseName
            courseId: items[0].courseId, // Assuming all items have the same courseId
            studentId: items[0].studentId, // Assuming all items have the same studentId
            courseFee: totalAmount / 100, // Convert back to dollars
            date: new Date() // Set the current date/time
        });

        // Save the payment document to the database
        await payment.save();
        

        console.log("Payment document saved:", payment);

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