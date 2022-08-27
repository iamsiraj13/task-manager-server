const mongoose = require("mongoose");

const taskDataModel = mongoose.Schema({
    title:{type:String},
    description:{type:String},
    status:{type:String},
    email:{type:String}, 
    createdDate:{type:Date,default:Data.now()},
},{versionKey:false});

const TasksModel = mongoose.model("tasks", taskDataModel);

module.exports = TasksModel;
