const mongoose = require("mongoose");

const userDataModel = mongoose.Schema({
    email:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    password:{type:String},
    mobile:{type:String},
    photo:{type:String},
    createdDate:{type:Date,default:Date.now()},
},{versionKey:false});

const UsersModel = mongoose.model("users", userDataModel);

module.exports = UsersModel;
