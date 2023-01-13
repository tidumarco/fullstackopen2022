const Persons = ({ search, persons, deletePerson, newPersons }) => {
  return (
    <ul>
      {search === ""
        ? persons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}{" "}
              <button onClick={() => deletePerson(person.id)}>Delete</button>
            </li>
          ))
        : newPersons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}{" "}
              <button onClick={() => deletePerson(person.id)}>Delete</button>
            </li>
          ))}
    </ul>
  );
};

export default Persons;
