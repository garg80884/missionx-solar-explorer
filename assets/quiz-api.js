
let questions = [];
let currentQuestion = 0;
let score = 0;

async function fetchQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple");
  const data = await res.json();
  questions = data.results.map(formatQuestion);
  showQuestion();
}

function formatQuestion(q) {
  const options = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
  return {
    question: decodeHTML(q.question),
    correct: decodeHTML(q.correct_answer),
    options: options.map(decodeHTML)
  };
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function showQuestion() {
  const q = questions[currentQuestion];
  const container = document.getElementById("quizContainer");
  let optionsHTML = "";
  q.options.forEach(opt => {
    optionsHTML += `
      <label>
        <input type="radio" name="answer" value="${opt}" /> ${opt}
      </label><br/>
    `;
  });

  container.innerHTML = `
    <h2>Question ${currentQuestion + 1} of ${questions.length}</h2>
    <p>${q.question}</p>
    <form id="quizForm">
      ${optionsHTML}
      <button type="submit">Submit</button>
    </form>
    <div id="result" class="mt-3"></div>
  `;

  document.getElementById("quizForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const selected = document.querySelector("input[name='answer']:checked");
    const result = document.getElementById("result");
    if (!selected) return;
    if (selected.value === questions[currentQuestion].correct) {
      result.innerHTML = "<p class='text-success'>✅ Correct!</p>";
      score++;
    } else {
      result.innerHTML = `<p class='text-danger'>❌ Incorrect. Correct Answer: ${questions[currentQuestion].correct}</p>`;
    }
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showScore();
      }
    }, 1500);
  });
}

function showScore() {
  document.getElementById("quizContainer").innerHTML = `
    <h2>🎉 Quiz Complete!</h2>
    <p>You scored ${score} out of ${questions.length}</p>
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}

window.onload = fetchQuestions;
