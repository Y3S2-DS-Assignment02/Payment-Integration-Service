const Payment = require('../models/Payment')
const paymentService = require('../services/paymentService');


exports.checkOutController = async (req, res) => {
    try {
        const items = req.body.items;
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error("Items must be a non-empty array.");
        }
        const sessionUrl = await paymentService.createPayment(items);
        res.json({ url: sessionUrl });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}