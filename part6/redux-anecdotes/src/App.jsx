import Anecdotes from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
