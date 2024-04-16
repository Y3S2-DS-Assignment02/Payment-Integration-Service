const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./database/index');

app.use(bodyParser.json());

app.use('/api/demo', require('./routes/demoRoute'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectToDatabase();
    console.log(`Server running on port ${PORT}`);
});