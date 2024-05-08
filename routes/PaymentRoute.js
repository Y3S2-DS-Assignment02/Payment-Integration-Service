const paymentController = require('../controllers/paymentController')
const express = require('express');
const router = express.Router();

router.post('/checkout', paymentController.checkOutController);
router.get('/getAllPayments', paymentController.getAllPayments);


module.exports = router;