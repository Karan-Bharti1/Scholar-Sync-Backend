const mongoose=require('mongoose')
const teacherSchema=new mongoose.Schema({
    teacherName:String,
    phoneNumber:String,
    emailId:String,
    qualification:String,
    resultPercentage:Number
})
const Teachers=mongoose.model("Teachers",teacherSchema)
module.exports=Teachers