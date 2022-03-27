import { useState } from "react"

const Person = ({ person }) => {
  return (
    <li>
      {person.name}
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState(
    'a new person...'
  )

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
    }

    setPersons(persons.concat(personObj))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App
