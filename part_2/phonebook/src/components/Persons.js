const Persons = ({ filter, persons, deletePerson }) => {
  return (
    <ul>
      {filter.query === ""
        ? persons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}{" "}
              <button onClick={() => deletePerson(person.id)}>Delete</button>
            </li>
          ))
        : filter.list.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}{" "}
              <button onClick={deletePerson(person.id)}>Delete</button>
            </li>
          ))}
    </ul>
  );
};

export default Persons;
