const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);
const Payment = require("../Models/Payment");

exports.createPayment = async (items) => {
    try {

        console.log(items)
        let totalAmount = 0;

        
        for (const item of items) {
            totalAmount += item.courseFee;
        }
        totalAmount *= 100; 

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

       
        await payment.save();

        console.log("Payment document saved:", payment);

        return session.url;
    } catch(error) {
        console.error("Error:", error);
        throw error;
    }
};
