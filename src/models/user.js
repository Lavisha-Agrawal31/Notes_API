const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({

    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
},{timestamps : true});  //create two fields in the schema  - createdAt and updatedAt 

module.exports = mongoose.model("User",UserSchema); //model is basically a class that we use to set the data and we save our data to database.