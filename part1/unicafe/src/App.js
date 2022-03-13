import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClick = () => {
    setAll(allClicks + 1)
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setAll(allClicks + 1)
    setBad(bad + 1)
  }

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const Display = ({ value, text }) => <div>{text} {value}</div>

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Display value={good} text='good' />
      <Display value={neutral} text='neutral' />
      <Display value={bad} text='bad' />
      <Display value={allClicks} text='all' />
      <Display value={(good - bad) / (allClicks === 0 ? 1 : allClicks)} text='average' />
      <Display value={good * 100 / (allClicks === 0 ? 1 : allClicks)} text='positive' />
    </div>
  )
}

export default App
