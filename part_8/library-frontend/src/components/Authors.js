import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [setBornTo, setSetBornTo] = useState("");
  const [changeBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const result = useQuery(ALL_AUTHORS);

  const submit = (event) => {
    event.preventDefault();

    changeBirthyear({ variables: { name, setBornTo } });
    setName("");
    setSetBornTo("");
  };

  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          {/* name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {result.data.allAuthors.map((a) => (
              <option key={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
