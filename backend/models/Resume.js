const mongoose = require("mongoose")

const ResumeSchema = new mongoose.Schema({

 userId:String,
 resumeText:String,
 atsScore:Number,
 missingSkills:[String],
 suggestions:String,
 createdAt:{type:Date,default:Date.now}

})

module.exports = mongoose.model("Resume",ResumeSchema)