const pdf = require("pdf-parse")
const fs = require("fs")

const calculateATS = require("../services/atsEngine")
const getAISuggestions = require("../services/geminiService")

const Resume = require("../models/Resume")

exports.analyzeResume = async(req,res)=>{

 const buffer = fs.readFileSync(req.file.path)

 const data = await pdf(buffer)

 const resumeText = data.text

 const jd = req.body.jd

 const {score,missing} = calculateATS(resumeText,jd)

 const aiSuggestions = await getAISuggestions(resumeText,jd)

 const newResume = new Resume({
   userId:req.user.id,
   resumeText,
   atsScore:score,
   missingSkills:missing,
   suggestions:aiSuggestions
 })

 await newResume.save()

 res.json({
   atsScore:score,
   missingSkills:missing,
   suggestions:aiSuggestions
 })

}