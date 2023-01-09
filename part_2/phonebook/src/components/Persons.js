const Persons = ({ filter,persons }) => {
  return (
    <ul>
      {filter.query === ""
        ? persons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
            </li>
          ))
        : filter.list.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
            </li>
          ))}
    </ul>
  );
};

export default Persons;
