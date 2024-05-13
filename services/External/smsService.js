const axios =  require('axios')

const sendSMS_Payments = async(to) => {
    try{
        
        console.log("to",to)

         const message ="Congratulations! You have successfully made a payment!";

        const response = await axios.post('http://localhost:3003/api/sms/sendSMS',{
            to,
            message
        });

        return response.data;

    } catch(error){
        console.log(error)
        throw error.response.data

    }
}

module.exports = {sendSMS_Payments}