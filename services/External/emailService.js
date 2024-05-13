const axios =  require('axios')

const sendEmail_Payments = async(email) => {
    try{

        console.log("email",email)
        
         const subject  = "Course Payment";
         const message ="Congratulations! You have successfully made payment!";

        const response = await axios.post('http://localhost:3003/api/email/sendEmail',{
            email,
            subject,
            message
        });

        return response.data;

    } catch(error){
        console.log(error)
        throw error.response.data

    }
}

module.exports = {sendEmail_Payments}