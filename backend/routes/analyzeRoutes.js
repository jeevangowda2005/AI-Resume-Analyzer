const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const calculateATS = require("../services/atsEngine");
const getAISuggestions = require("../services/geminiService");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

/* Analyze single resume */
router.post("/", upload.single("resume"), async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const buffer = fs.readFileSync(req.file.path);

    const data = await pdfParse(buffer);

    const resumeText = data.text;

    const jd = req.body.jd || "";

    const result = calculateATS(resumeText, jd);

    /* AI suggestions */
    const suggestions = await getAISuggestions(resumeText, jd);

    res.json({
      atsScore: result.score,
      matchedSkills: result.matched,
      missingSkills: result.missing,
      suggestions
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Resume analysis failed" });

  }

});


/* Compare two resumes */
router.post("/compare", upload.array("resumes", 2), async (req, res) => {

  try {

    if (!req.files || req.files.length < 2) {
      return res.status(400).json({ error: "Two resumes required" });
    }

    const jd = req.body.jd || "";

    const file1 = fs.readFileSync(req.files[0].path);
    const file2 = fs.readFileSync(req.files[1].path);

    const data1 = await pdfParse(file1);
    const data2 = await pdfParse(file2);

    const r1 = calculateATS(data1.text, jd);
    const r2 = calculateATS(data2.text, jd);

    res.json({
      resume1Score: r1.score,
      resume2Score: r2.score,
      improvement: r2.score - r1.score
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Comparison failed" });

  }

});

module.exports = router;