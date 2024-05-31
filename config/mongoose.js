/** ------------------ IMPORTING PACKAGES ------------------ **/
const mongoose = require("mongoose");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

/** ------------------ MAKING CONNECTION ------------------ **/

const DB = process.env.DB;
const connectWithRetry = () => {
    mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
        socketTimeoutMS: 45000 // Increase socket timeout to 45 seconds
    }).then(() => {
        console.log('Connection successful!');
    }).catch((err) => {
        console.error("No connection: " + err);
        console.log("Retrying connection in 5 seconds...");
        setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
    });
};

connectWithRetry();

// Setting it to db
const db = mongoose.connection;

/** ------------------ CHECKING CONNECTION ------------------ **/
// If an error occurs
db.on("error", console.error.bind(console, "Error connecting to DB"));
// When db connects successfully
db.once("open", function(){
    console.log("Successfully connected to DB");
});

/** ------------------ EXPORTING DB ------------------ **/
module.exports = db;
