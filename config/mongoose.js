/** ------------------ IMPORTING PACKAGES ------------------ **/
const mongoose = require("mongoose");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

/** ------------------ MAKING CONNECTION ------------------ **/

const DB = process.env.DB;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connection successful!');
}).catch((err) => {
    console.log("No connection: " + err);
});

//setting it to db
const db = mongoose.connection;

/** ------------------ CHECKING CONNECTION ------------------ **/
//if error occurs
db.on("error", console.error.bind(console, "Error connecting to DB"));
// when db connects successfully
db.once("open", function(){
    console.log("Successfully connected to DB");
});

/** ------------------ EXPORTING DB ------------------ **/
module.exports = db;
