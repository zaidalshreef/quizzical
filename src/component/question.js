export default function Question(props) {
  let answerElements = props.allAnswers.map((Answer, index) => {
 function buttonStyle() {
  
  if (props.checkanswer) {
    if (Answer.answer === props.correctAnswer) {
      return "answer correct";
    }else if (Answer.answer !== props.correctAnswer && Answer.selected) {
      return "answer wrong";
    }else{
      return "answer checking-answers";
    }
  }else{
    return Answer.selected ? "answer checked " : "answer"
  }
 }
    
     
    return (
      <button
        className={buttonStyle()}
        key={index}
        onClick={() => props.handleAnswer(Answer.answer, props.question)}
      >
        {Answer.answer}
      </button>
    );
  });

  return (
    <div className="question-container">
      <h1 className="question">{props.question}</h1>
      {answerElements}
    </div>
  );
}
