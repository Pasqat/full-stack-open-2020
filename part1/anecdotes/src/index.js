import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const points = new Array(anecdotes.length + 1)
    .join("0")
    .split("")
    .map(parseFloat);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points);

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = (selected) => {
    const copy = [...votes];
    (copy[selected] += 1)
    setVotes(copy);
  };

  let bestOf = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <button onClick={() => handleVote(selected)}>
        <span role="img" aria-label="vote up">
          😂
        </span>
      </button>
      <button onClick={() => handleClick()}>next anectode</button>

    <h1>Anecdote with most votes</h1>
    <div>{props.anecdotes[bestOf]}</div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
