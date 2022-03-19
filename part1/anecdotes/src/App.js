import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(7).fill(0))
  const [maxVotesIndex, setMaxVotesIndex] = useState(0)
  const [maxVotes, setMaxVotes] = useState(0)

  const handleRandomClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVotesClick = () => {
    const newCopyOfVotes = [...votes]
    newCopyOfVotes[selected] += 1
    setVotes(newCopyOfVotes)
    if (newCopyOfVotes[selected] > maxVotes) {
      setMaxVotes(newCopyOfVotes[selected])
      setMaxVotesIndex(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Button handleClick={handleVotesClick} text="vote" />
      <Button handleClick={handleRandomClick} text="next anecdote" /> <br />
      <br />
      has {votes[selected]} votes.<br />
      <br />
      {anecdotes[selected]} <br />
      <h1>Anecdote with most votes</h1>
      has {maxVotes} votes.<br />
      <br />
      {anecdotes[maxVotesIndex]} <br />

    </div>
  )
}

export default App
