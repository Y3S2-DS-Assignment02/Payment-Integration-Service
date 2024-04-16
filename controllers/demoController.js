const demoService = require('../services/demoService');

exports.helloWorldController = (req, res) => {
    const response = demoService.getHelloWorld();
    res.status(200).send(response);
};
