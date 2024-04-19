const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./database/index');
const checkoutRouter = require('./routes/PaymentRoute');

app.use(bodyParser.json());



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectToDatabase();
    console.log(`Server running on port ${PORT}`);
});

app.use('/api', checkoutRouter);