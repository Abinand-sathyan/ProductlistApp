const mongoose = require('mongoose');
var express = require('express');


const connectDb = async (DATABASE_URL) => {
    
mongoose.set("strictQuery", false);
    try{
        console.log("connecting database");
        console.log(DATABASE_URL);
        const DB_OPTIONS ={dbName:'productapp'}
        await mongoose.connect(DATABASE_URL,DB_OPTIONS )
        console.log('connected successfully..');
    }catch(error){
        console.log(error);
    }
}
module.exports = connectDb; 