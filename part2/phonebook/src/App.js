import { useState, useEffect } from 'react';
import personService from './services/persons';
import Display from './components/Display';
import Search from './components/Search';
import Form from './components/Form';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [charFilter, setCharFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const applyCharFilter = persons.filter((person) =>
    person.name.toLowerCase().includes(charFilter.toLowerCase())
  );
  const personsToShow = charFilter === '' ? persons : applyCharFilter;

  const createPersonObj = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    const exists = names.includes(newName);

    if (!exists) {
      const personObj = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old number with a new one?`
        )
      ) {
        const per = persons.find((n) => n.name === newName);
        console.log(per.id);
        const changedPerson = { ...per, number: newNumber };

        personService.update(per.id, changedPerson).then((returnedPerson) => {
          setPersons(
            persons.map((n) => (n.id !== per.id ? n : returnedPerson))
          );
          setNewName('');
          setNewNumber('');
        });
      }
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.filter((n) => n.id === id);
    if (window.confirm('Delete ' + personToDelete.map((n) => n.name) + ' ?')) {
      personService
        .deleteObj(id)
        .then(setPersons(persons.filter((n) => n.id !== id)));
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setCharFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search charFilter={charFilter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        createPersonObj={createPersonObj}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Display
          key={person.id}
          name={person.name}
          number={person.number}
          deletePerson={() => deletePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
