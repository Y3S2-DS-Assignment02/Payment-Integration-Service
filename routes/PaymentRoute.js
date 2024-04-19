const paymentController = require('../controllers/paymentController')
const express = require('express');
const router = express.Router();

router.post('/checkout', paymentController.checkOutController);

module.exports = router;