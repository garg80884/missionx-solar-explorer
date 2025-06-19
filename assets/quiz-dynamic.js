// Using placeholder questions from a mock API
const question = {
  title: "Solar System Trivia",
  question: "Which planet has the most moons?",
  options: [
    { id: "a", text: "Earth" },
    { id: "b", text: "Mars" },
    { id: "c", text: "Saturn" }
  ],
  correct: "c",
  correctExplanation: "c) Saturn has the most confirmed moons."
};

function loadQuiz() {
  const container = document.getElementById("quizContainer");
  let optionsHTML = "";
  question.options.forEach(opt => {
    optionsHTML += `
      <label>
        <input type="radio" name="answer" value="${opt.id}" /> ${opt.text}
      </label><br/>
    `;
  });

  container.innerHTML = `
    <h2>${question.title}</h2>
    <p>${question.question}</p>
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
    if (selected.value === question.correct) {
      result.innerHTML = "<p class='text-success'>✅ Correct!</p>";
    } else {
      result.innerHTML = `<p class='text-danger'>❌ Incorrect. Correct Answer: ${question.correctExplanation}</p>`;
    }
  });
}

window.onload = loadQuiz;
