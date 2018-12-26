// Stopwatch: Custom hook
import React, {useReducer, useEffect, useRef} from 'react'

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200,
}

function useStopwatch(){
  const timerRef = useRef(null)
  const [{running, lapse}, setState] = useReducer(reducer, {
    running: false,
    lapse: 0,
  })

  useEffect(() => () => clearInterval(timerRef.current), [])
  function handleRunClick() {
    if (running) {
      clearInterval(timerRef.current)
    } else {
      const startTime = Date.now() - lapse
      timerRef.current = setInterval(() => {
        setState({lapse: Date.now() - startTime})
      }, 0)
    }
    setState({running: !running})
  }

  function handleClearClick() {
    clearInterval(timerRef.current)
    setState({running: false, lapse: 0})
  }
  return {
    lapse,
    running,
    handleRunClick,
    handleClearClick
  }

}

function reducer(currentState, newState) {
  return {...currentState, ...newState}
}

function Stopwatch() {
  // 🐨 1. put all the logic for the stopwatch (including event handlers)
  // in a custom hook called useStopwatch
  // return the state, and event handlers in an object
  /*
  const [{running, lapse}, setState] = useReducer(reducer, {
    running: false,
    lapse: 0,
  })
  const timerRef = useRef(null)

  useEffect(() => () => clearInterval(timerRef.current), [])

  function handleRunClick() {
    if (running) {
      clearInterval(timerRef.current)
    } else {
      const startTime = Date.now() - lapse
      timerRef.current = setInterval(() => {
        setState({lapse: Date.now() - startTime})
      }, 0)
    }
    setState({running: !running})
  }

  function handleClearClick() {
    clearInterval(timerRef.current)
    setState({running: false, lapse: 0})
  }

*/
  // 🐨 2. call your useStopwatch custom hook and get the state and event handlers
  // for two individual stopwatches.

  const stopwatch1 = useStopwatch()
  const stopwatch2 = useStopwatch()

  // 🐨 3. update the returned JSX to render two stopwatches and the diff between them
  // 💰 if you want the tests to pass, make sure to pass a `data-testid="diff"` prop
  // to the span where you render the difference.

  return (
    <div style={{textAlign: 'center'}}>
      <StopwatchView
        lapse={stopwatch1.lapse}
        running={stopwatch1.running}
        onRunClick={stopwatch1.handleRunClick}
        onClearClick={stopwatch1.handleClearClick}
      />
      <hr />
      <strong>Lapse Difference:</strong>
      <span data-testid="diff">
        {stopwatch1.lapse - stopwatch2.lapse}
        ms
      </span>
      <hr />
      <StopwatchView
        lapse={stopwatch2.lapse}
        running={stopwatch2.running}
        onRunClick={stopwatch2.handleRunClick}
        onClearClick={stopwatch2.handleClearClick}
      />
    </div>
  )
}

function StopwatchView({lapse, running, onRunClick, onClearClick}) {
  return (
    <>
      <label
        style={{
          fontSize: '5em',
          display: 'block',
        }}
      >
        {lapse}
        ms
      </label>
      <button onClick={onRunClick} style={buttonStyles}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={onClearClick} style={buttonStyles}>
        Clear
      </button>
    </>
  )
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <Stopwatch />
}
Usage.title = 'Stopwatch: Custom hook'

export default Usage
