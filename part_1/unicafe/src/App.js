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
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>Average {average.toFixed(1)}</p>
      <p>Total {total}</p>
	  <p>Positive {positive.toFixed(1)} %</p>
    </>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const total = clicks.good + clicks.neutral + clicks.bad;
  const average = (clicks.good * 1 + clicks.bad * -1) / total;
  const positive = clicks.good / total * 100

  const handleGoodClick = () => setClicks({ ...clicks, good: clicks.good + 1 });

  const handleNeutralClick = () =>
    setClicks({ ...clicks, neutral: clicks.neutral + 1 });

  const handleBadClick = () => setClicks({ ...clicks, bad: clicks.bad + 1 });

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />

      <Statistics
        good={clicks.good}
        neutral={clicks.neutral}
        bad={clicks.bad}
        total={total}
        average={average}
		positive={positive}
      />
    </div>
  );
};

export default App;
