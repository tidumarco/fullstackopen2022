import { useState, useEffect } from "react";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPersons, setNewPersons] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
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
    const person = persons.find((person) => person.name === newName);

    const changedPerson = { ...person, number: newNumber };

    if (
      persons.filter((person) => person.name === personObject.name).length > 0
    ) {
      if (
        window.confirm(
          `${personObject.name} is already added to the phonebook, replace the old number with a new one ?`
        )
      ) {
        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((personItem) =>
                // personItem.id !== person.id ? personItem : returnedPerson
                personItem.name === newName ? returnedPerson : personItem
              )
            );

            setMessage(`${changedPerson.name} number successfully updated!`);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            // setMessage(`${person.name} already deleted from the server!`);
            setMessage(`${error.response.data.error}`);
            console.log(error.response.data);
          });
        // setPersons(persons.concat(personObject));
        // setMessage(`${changedPerson.name} number successfully updated!`);
        // setNewName("");
        // setNewNumber("");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } else {
      personService
        .create(personObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setMessage(`${newPerson.name} successfully added to the phonebook!`);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setMessage(`${error.response.data.error}`);
          console.log(error.response.data);
        });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const deletePerson = (id) => {
    const personId = persons.find((person) => person.id === id);
    const personToDelete = { ...personId };
    const updatedPersons = persons.filter((person) => person.id !== id);
    if (window.confirm(`Do you want to delete ${personToDelete.name}?`)) {
      personService.deletePerson(personToDelete.id);
      setMessage(
        `${personToDelete.name} successfully deleted from the phonebook!`
      );
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setPersons([...updatedPersons]);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    const query = event.target.value;
    let results;
    results = persons.filter((person) => {
      return person.name.toLowerCase().includes(query.toLowerCase());
    });
    setSearch(query);
    setNewPersons(results);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <h3>Search a person:</h3>

      <Search search={search} handleChange={handleFilterChange} />

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
        search={search}
        persons={persons}
        deletePerson={deletePerson}
        newPersons={newPersons}
      />
    </div>
  );
};

export default App;
