import { useState } from "react"
import Persons from "./components/Persons"
import Search from "./components/Search"
import PersonForm from "./components/PersonForm"


const App = ({ personsArr }) => {
  const [persons, setPersons] = useState(personsArr)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [charFilter, setCharFilter] = useState('')

  const applyCharFilter = persons.filter(person => person.name.toLowerCase().includes(charFilter.toLowerCase()))
  const personsToShow = charFilter === ''
    ? persons
    : applyCharFilter

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    const exists = names.includes(newName)

    if (!exists) {
      const personObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setCharFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search
        charFilter={charFilter}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Persons
          key={person.id}
          name={person.name}
          number={person.number}
        />
      )}
    </div>
  )
}

export default App
