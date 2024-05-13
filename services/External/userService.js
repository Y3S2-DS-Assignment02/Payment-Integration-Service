const axios = require('axios');

const GetUserDetailsById = async (studentId) => {
    try {
        console.log("studentId2", studentId);
        const response = await axios.get(`http://localhost:3001/api/user-service/getUserByID/${studentId}`);
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.response.data);
        throw error.response.data;
    }
}

module.exports = { GetUserDetailsById };
