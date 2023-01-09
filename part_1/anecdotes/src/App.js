import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({ winner, winCount }) => {
  if (winCount == 0) {
    return <p>No winner yet</p>;
  }
  return (
    <>
      <h1>The winning anecdote is</h1>
      <div>{winner}</div>
      <div>with</div>
      <div>{winCount} votes</div>
    </>
  );
};

const Winner = ({ votes, anecdotes }) => {
  const winCount = Math.max(...votes);
  const winnerIndex = votes.indexOf(winCount);
  const winner = anecdotes[winnerIndex];

  return (
    <>
      <Anecdote winner={winner} winCount={winCount} />
    </>
  );
};
const App = (props) => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(6).fill(0));

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const handleClick = () => {
    const rndInt = randomIntFromInterval(0, 6);
    setSelected(() => rndInt);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <Button onClick={handleClick} text="Next Anecdote" />
      <Button onClick={handleVote} text="Vote this anecdote" />
      <Winner votes={votes} anecdotes={anecdotes} />
    </>
  );
};

export default App;
