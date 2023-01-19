import { useState } from "react";

const Statistics = ({ good, neutral, bad, average, total, positive }) => {
  if (total === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <div>No feedback given</div>
      </>
    );
  }

  return (
    <>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Average: {average.toFixed(1)}</p>
      <p>Total: {total}</p>
	  <p>Positive: {positive.toFixed(1)}%</p>
    </>
  );
};

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = (good * 1 + bad * -1) / total;
  const positive = (good / total) * 100;

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
