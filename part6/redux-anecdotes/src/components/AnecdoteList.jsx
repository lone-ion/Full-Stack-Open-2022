import { useSelector, useDispatch } from 'react-redux'
import { changeVotesOf } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anecdotes
    }

    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
  })

  return (
    <ul>
      {[...anecdotes]
        .sort(function (a, b) {
          return b.votes - a.votes
        })
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(changeVotesOf(anecdote.id))}>vote</button>
            </div>
          </div>
        ))}
    </ul>
  )
}

export default Anecdotes
