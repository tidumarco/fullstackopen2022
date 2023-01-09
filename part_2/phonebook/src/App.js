import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState({ query: "", list: [] });

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.includes(newName)) {
        alert(`${newName} is already in the phonebook!`);
        setNewName("");
      } else {
        setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
      }
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleChange = (e) => {
    const results = persons.filter((person) => {
      if (e.target.value === "") return persons;
      return person.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilter({ query: e.target.value, list: results });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search a person:</h3>
      <Filter filter={filter} handleChange={handleChange} />
      <h3>Add a new person</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
    </div>
  );
};

export default App;
