require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

const ClientData = require('./models/ClientData');

const dbUrl = process.env.DB_URL;

module.exports = {

    initialize: async() => {
        try {
            
            await mongoose.connect(dbUrl, {
                useNewUrlParser : true,
                useUnifiedTopology: true,
            });
            console.log('database connected succesfully');

        } catch (error) {
            console.log(`Error connecting to database:${error.message}`);
            throw error;
        }
    },

    addData: async (data) => {
        try {
            console.log(data);
            console.log("entered into post request  to insert data in database ")
            const newData = {
                name: data.name,
                email: data.email,
                contactno: data.contactno,
                subject: data.subject,
                message: data.message,
            };
            console.log(newData);
            const newmessage_data = new ClientData(newData);

            // Save the new restaurant to the database
            const result = await newmessage_data.save();

            return { success: true, message: 'Message sent successfully', result };
        } catch (error) {
            // Log and throw an error if adding new restaurant fails
            console.error(`Error adding new restaurant: ${error.message}`);
            throw { success: false, message: 'Error adding new restaurant' };
        }
    }


};