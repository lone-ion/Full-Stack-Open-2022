import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ ratings }) => {
  const average = (ratings[0] - ratings[2]) / (ratings[3] === 0 ? 1 : ratings[3])
  const positive = ratings[0] * 100 / (ratings[3] === 0 ? 1 : ratings[3])

  if (ratings[3] === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  else {
    return (
      <table>
        <tbody>
          <StatisticsLine value={ratings[0]} text='good' sym='' />
          <StatisticsLine value={ratings[1]} text='neutral' sym='' />
          <StatisticsLine value={ratings[2]} text='bad' sym='' />
          <StatisticsLine value={ratings[3]} text='all' sym='' />
          <StatisticsLine value={average} text='average' sym='' />
          <StatisticsLine value={positive} text='positive' sym='%' />
        </tbody>
      </table>
    )
  }
}

const StatisticsLine = ({ value, text, sym }) => <tr><td>{text}</td><td>{value} {sym} </td></tr>

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

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics ratings={[good, neutral, bad, allClicks]} />
    </div>
  )
}

export default App
