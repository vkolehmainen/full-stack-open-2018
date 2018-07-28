import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ name }) => {
  return(
    <h1>{name}</h1>
  )
}

const Statistics = ({ state }) => {
  if (Object.values(state).every( x => x === 0 )) {
    return(<p>ei yhtään palautetta annettu</p>)
  }

  else {
    return(
      <div>
        < DisplayVotes option={"hyvä"} votes={state.hyva} />
        < DisplayVotes option={"neutraali"} votes={state.neutraali} />
        < DisplayVotes option={"huono"} votes={state.huono} />

        < DisplayAverage state={state} />
        < DisplayPositive state={state} />
      </div>
    )
  }
}

const DisplayVotes = ({ option, votes }) => {
  return(
    <p>{option} {votes}</p>
  )
}

const DisplayAverage = ({state}) => {
  var sum = state.hyva + state.huono + state.neutraali
  const average = (1*state.hyva + -1*state.huono) / sum
  return(
    <p>{"keskiarvo"} {Number.parseFloat(average).toFixed(1)}</p>
  )
}

const DisplayPositive = ({state}) => {
  var sum = state.hyva + state.huono + state.neutraali
  const positive = state.hyva / sum * 100
  return(
    <p>{"positiivisia"} {Number.parseFloat(positive).toFixed(1)}{"%"}</p>
  )
}

const Button = ({ option, state, buttonClick }) => {
  return(
    <button onClick={buttonClick(option, state[option]+1)}> {option} </button>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  render() {
    const voteOption = (option, newValue) => () => {
        return (this.setState({ [option]: newValue }))
    }

    return (
      <div>
        < Header name={"Anna palautetta"}/>
        < Button option={"hyva"} state={this.state} buttonClick={voteOption} />
        < Button option={"neutraali"} state={this.state} buttonClick={voteOption} />
        < Button option={"huono"} state={this.state} buttonClick={voteOption} />

        < Header name={"Statistiikka"}/>
        < Statistics state={this.state}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
