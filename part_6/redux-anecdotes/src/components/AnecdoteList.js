import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer.js";
import { setNotificationWithTimeout } from "../reducers/notificationReducer.js";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const vote = () => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotificationWithTimeout(`new anecdote '${anecdote.content}'`, 5));
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={vote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === null) {
      return anecdotes;
    }

    const regex = new RegExp(filter, "i");
    return anecdotes.filter((anecdote) => anecdote.content.match(regex));
  });

  const byVotes = (b1, b2) => b2.votes - b1.votes;

  return anecdotes
    .sort(byVotes)
    .map((anecdote) => <Anecdote key={anecdote.id} anecdote={anecdote} />);
};

export default AnecdoteList;
