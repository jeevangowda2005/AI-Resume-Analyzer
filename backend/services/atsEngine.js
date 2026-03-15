const skills = [
  "java",
  "python",
  "javascript",
  "react",
  "node",
  "mongodb",
  "sql",
  "docker",
  "aws",
  "rest api"
];

function calculateATS(resumeText, jdText) {

  const text = resumeText.toLowerCase();

  let matched = [];

  skills.forEach(skill => {
    if (text.includes(skill)) {
      matched.push(skill);
    }
  });

  const missing = skills.filter(s => !matched.includes(s));

  const score = Math.round((matched.length / skills.length) * 100);

  return {
    score,
    matched,
    missing
  };

}

module.exports = calculateATS;