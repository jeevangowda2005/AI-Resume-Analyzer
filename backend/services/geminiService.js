const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_KEY
});

async function getAISuggestions(resume, jd) {

  try {

    const prompt = `
You are an ATS resume analyzer.

Analyze the resume against the job description.

Resume:
${resume}

Job Description:
${jd}

Give:

1. Missing Skills
2. Resume Improvements
3. Recommended Job Roles
`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: prompt }
      ],
      model: "llama-3.1-8b-instant"
    });

    return completion.choices[0].message.content;

  } catch (error) {

    console.log("GROQ ERROR:");
    console.log(error.message);

    return "AI suggestions unavailable.";

  }

}

module.exports = getAISuggestions;