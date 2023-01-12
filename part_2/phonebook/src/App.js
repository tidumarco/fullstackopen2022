import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState({ query: "", list: [] });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const person = persons.filter((person) => person.name === newName);

    const personToAdd = person[0];
    const updatedPerson = { ...personToAdd, number: newNumber };

    if (person.length !== 0) {
      if (
        window.confirm(
          `${personToAdd.name} is already added to the phonebook, replace the old number with a new one ?`
        )
      ) {
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setMessage(`${returnedPerson.name} successfully updated!`);
            setPersons(
              persons.map((personItem) =>
                personItem.id !== personToAdd.id ? personItem : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
			console.log(`${updatedPerson.name} already deleted from the server!`)
            setMessage(
              `${updatedPerson.name} already deleted from the server!`
            );
          });
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setMessage(
          `${returnedPerson.name} successfully added to the phonebook!`
        );
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  const deletePerson = (id) => {
    const personId = persons.find((person) => person.id === id);
    const deletedPerson = { ...personId };
    const updatedPersons = persons.filter((person) => person.id !== id);
    personService.deletePerson(deletedPerson.id);
    setMessage(
      `${deletedPerson.name} successfully deleted from the phonebook!`
    );
    setTimeout(() => {
      setMessage(null);
    }, 5000);
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
      <Notification message={message} />
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
      <Persons
        className="persons"
        filter={filter}
        persons={persons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
