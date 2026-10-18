import { el } from "../utils/dom.js";

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function initQuiz(container, allQuestions) {
  let questions = [];
  let index = 0;
  let score = 0;

  function start() {
    questions = shuffle(allQuestions);
    index = 0;
    score = 0;
    renderQuestion();
  }

  function renderQuestion() {
    const q = questions[index];
    const feedback = el("p", { class: "quiz__feedback", "aria-live": "polite" });
    const actions = el("div", { class: "quiz__actions" });
    const buttons = q.options.map((option, i) =>
      el("button", { class: "quiz__option", type: "button", onClick: () => answer(i) }, option)
    );

    function answer(choice) {
      buttons.forEach((b, i) => {
        b.disabled = true;
        if (i === q.answer) b.classList.add("is-correct");
        else if (i === choice) b.classList.add("is-wrong");
      });
      if (choice === q.answer) score++;
      feedback.textContent = (choice === q.answer ? "Correct! " : "Not quite. ") + q.explanation;
      const last = index === questions.length - 1;
      actions.append(
        el("button", { class: "btn btn--primary", type: "button", onClick: () => (last ? renderResult() : next()) }, last ? "See result" : "Next question")
      );
    }

    container.replaceChildren(
      el("div", { class: "quiz__progress" }, el("div", { class: "quiz__bar", style: `width:${(index / questions.length) * 100}%` })),
      el("span", { class: "quiz__count" }, `Question ${index + 1} of ${questions.length}`),
      el("h3", { class: "quiz__question" }, q.question),
      el("div", { class: "quiz__options" }, buttons),
      feedback,
      actions
    );
  }

  function next() {
    index++;
    renderQuestion();
  }

  function renderResult() {
    const ratio = score / questions.length;
    const message = ratio === 1 ? "Perfect score! You're an anatomy pro." : ratio >= 0.6 ? "Great job! Keep exploring." : "Good start. Review the systems and try again.";
    container.replaceChildren(
      el(
        "div",
        { class: "quiz__result" },
        el("div", { class: "quiz__score" }, `${score}/${questions.length}`),
        el("p", {}, message),
        el("button", { class: "btn btn--primary", type: "button", onClick: start }, "Try again")
      )
    );
  }

  start();
}