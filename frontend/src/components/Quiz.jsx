import { useState } from "react";
import "./Quiz.css";

function Quiz({ quiz }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selected) => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) correct++;
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const score = calculateScore();
    const total = quiz.questions.length;
    const percentage = (score / total) * 100;

    return (
      <div className="quiz-result">
        <h3>Quiz Complete!</h3>
        <div className="score-circle">
          <span className="score">
            {score}/{total}
          </span>
          <span className="percentage">{percentage.toFixed(0)}%</span>
        </div>
        <button onClick={resetQuiz} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  const question = quiz.questions[currentQ];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h3>{quiz.skill} Quiz</h3>
        <span className="question-counter">
          Question {currentQ + 1} of {quiz.questions.length}
        </span>
      </div>

      <div className="question-section">
        <h4>{question.question}</h4>

        <div className="options-list">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className="option-btn"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
