import { useState, useEffect } from 'react';
import recordService from './services/persons';
import Display from './components/Display';
import Search from './components/Search';
import Form from './components/Form';
import './index.css';

const App = () => {
  const [records, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setCharFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);

  useEffect(() => {
    recordService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const filteredRecords = records.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  const recordsToShow = filter === '' ? records : filteredRecords;

  const lookupPerson = (event) => {
    event.preventDefault();
    const names = records.map((person) => person.name);
    const exists = names.includes(newName);

    if (!exists) {
      createPerson();
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old number with a new one?`
        )
      ) {
        updatePhoneNumber();
      }
    }
  };

  const updatePhoneNumber = () => {
    const foundPerson = records.find((n) => n.name === newName);
    const updatedPerson = { ...foundPerson, number: newNumber };

    recordService
      .update(updatedPerson.id, updatedPerson)
      .then((returnedRecord) => {
        setPersons(
          records.map((n) => (n.id !== updatedPerson.id ? n : returnedRecord))
        );
        setNewName('');
        setNewNumber('');
        setConfirmMessage(`Updated ${newName} number`);
        setTimeout(() => {
          setConfirmMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(
          `Person ${updatedPerson.name} was already removed from server!`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(records.filter((n) => n.id !== updatedPerson.id));
        setNewName('');
        setNewNumber('');
      });
  };

  const createPerson = () => {
    const personObj = {
      name: newName,
      number: newNumber,
    };
    recordService.create(personObj).then((returnedRecord) => {
      setPersons(records.concat(returnedRecord));
      setNewName('');
      setNewNumber('');
      setConfirmMessage(`Added ${newName}`);
      setTimeout(() => {
        setConfirmMessage(null);
      }, 5000);
    });
  };

  const removePerson = (id) => {
    const personToDelete = records.find((n) => n.id === id);
    if (window.confirm('Delete ' + personToDelete.name + ' ?')) {
      recordService
        .deleteObj(id)
        .then(() => {
          setPersons(records.filter((n) => n.id !== id));
          setConfirmMessage(`${personToDelete.name} deleted!`);
          setTimeout(() => {
            setConfirmMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `Person ${personToDelete.name} was already removed from server!`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(records.filter((n) => n.id !== personToDelete.id));
        });
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

  const Notification = ({ errorMessage, confirmMessage }) => {
    if (errorMessage) {
      return <div className='error'>{errorMessage}</div>;
    }
    if (confirmMessage) {
      return <div className='confirm'>{confirmMessage}</div>;
    }
    return null;
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification confirmMessage={confirmMessage} />
      <Notification errorMessage={errorMessage} />
      <Search filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        lookupPerson={lookupPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      {recordsToShow.map((person) => (
        <Display
          key={person.id}
          name={person.name}
          number={person.number}
          removePerson={() => removePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
