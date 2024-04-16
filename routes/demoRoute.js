const express = require('express');
const { helloWorldController } = require('../controllers/demoController');

const router = express.Router();

// Define your routes here
router.get('/', helloWorldController);


module.exports = router;