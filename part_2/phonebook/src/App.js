import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState({ query: "", list: [] });
  const allPersons = personService.getAll().then((response) => response.data);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  console.log(allPersons);
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const changedPerson = { ...personObject, number: newNumber };

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.includes(newName)) {
        alert(
          `${newName} is already in the phonebook, replace the old number with a new one?`
        );
      }
    }
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    const personId = persons.find((person) => person.id === id);
    const deletedPerson = { ...personId };
	const updatedPersons = persons.filter((person) => person.id !== id)
    personService.deletePerson(deletedPerson.id);
    setPersons([...updatedPersons]);
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
      <Persons filter={filter} persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
