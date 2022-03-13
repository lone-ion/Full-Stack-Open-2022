import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => {
        setAll(allClicks + 1)
        setGood(good + 1)
      }}>
        good
      </button>
      <button onClick={() => {
        setAll(allClicks + 1)
        setNeutral(neutral + 1)
      }}>
        neutral
      </button>
      <button onClick={() => {
        setAll(allClicks + 1)
        setBad(bad + 1)
      }}>
        bad
      </button>
      <h1>statistics</h1>
      good {good} <br />
      neutral {neutral}<br />
      bad {bad}<br />
      all {allClicks}<br />
      average {(good - bad) / (allClicks === 0 ? 1 : allClicks)}<br />
      positive {good * 100 / (allClicks === 0 ? 1 : allClicks)} %
    </div>
  )
}

export default App
