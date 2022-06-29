export default function Intro(props) {
  return (
    <div>
      <h1 className="AppTitle">Quizzical</h1>
      <p className="description">Some description if needed</p>
      <button className="btn btn-start" onClick={props.handleStart}>Start quiz</button>
    </div>
  );
}
