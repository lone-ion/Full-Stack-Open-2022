import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({
      type: 'NEW_ANECDOTE',
      payload: {
        content,
        votes: 0,
        id: (100000 * Math.random()).toFixed(0),
      },
    })
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'VOTE',
      payload: { id },
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(function (a, b) {
      return b.votes - a.votes
    }).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
