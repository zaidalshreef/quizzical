import "./App.css";
import Intro from "./component/intro";
import Question from "./component/question";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
  const [scored, setscored] = useState(0);
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((response) => response.json())
      .then((data) =>
        setQuestions(() => {
          return data.results.map((question) => {
            question.incorrect_answers.splice(
              Math.floor(Math.random() * 3),
              0,
              question.correct_answer
            );
            return {
              id: nanoid(),
              question: question.question,
              correctAnswer: question.correct_answer,
              answers: [
                { answer: question.incorrect_answers[0], selected: false },
                { answer: question.incorrect_answers[1], selected: false },
                { answer: question.incorrect_answers[2], selected: false },
                { answer: question.incorrect_answers[3], selected: false },
              ],
            };
          });
        })
      );
  }, [playAgain]);

  const questionElmemnt = questions.map((question) => {
    return (
      <Question
        key={question.id}
        question={question.question}
        allAnswers={question.answers}
        correctAnswer={question.correctAnswer}
        handleAnswer={handleAnswer}
        checkanswer={checkAnswers}
      ></Question>
    );
  });

  function handleStart() {
    setStart(true);
  }

  function handleAnswer(Answer, Question) {
    if (!checkAnswers) {
      setQuestions((oldvalue) => {
        return oldvalue.map((question) => {
          return question.question === Question
            ? {
                ...question,
                answers: question.answers.map((answer) => {
                  return answer.answer === Answer
                    ? { ...answer, selected: !answer.selected }
                    : { ...answer, selected: false };
                }),
              }
            : question;
        });
      });
    }
  }

  function checkAnswer() {
    let number = 0;
    questions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.selected && answer.answer === question.correctAnswer) {
          number++;
        }
      });
      setCheckAnswers(true);
      setscored(number);
    });
  }

  function playagain() {
    setPlayAgain(!playAgain);
    setCheckAnswers(false);
  }

  return (
    <div className="App">
      {!start ? <Intro handleStart={handleStart} /> : questionElmemnt}

      {start &&
        (!checkAnswers ? (
          <button className="btn" onClick={checkAnswer}>
            Check answers
          </button>
        ) : (
          <div>
            <span>You scored {scored}/5 correct answers</span>
            <button className="btn btn-playAgain" onClick={playagain}>
              Play again
            </button>
          </div>
        ))}
    </div>
  );
}

export default App;
