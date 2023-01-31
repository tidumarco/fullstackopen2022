import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

import { setNotificationWithTimeout } from "../reducers/notificationReducer.js";

const AnecdoteForm = ({ anecdote }) => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotificationWithTimeout(`new anecdote '${content}'`, 5));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
