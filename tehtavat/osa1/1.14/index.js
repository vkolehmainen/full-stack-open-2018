import React from 'react'
import ReactDOM from 'react-dom'

const Anecdote = (props) => {
  return(
    <div>
      <p>{props.anecdotes[props.anecdote]}</p>
      <p> This anecdote has {props.state.votes[props.anecdote]} votes </p>
    </div>
  )
}

const Header = (props) => {
  return(
    <h1>{props.text}</h1>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      mostVoted: 0,
      votes: {}
    }
    // initialize votes with zeros
    for (var i = 0; i < this.props.anecdotes.length; i++) {this.state.votes[i] = 0}
  }

  render() {
    const nextAnecdote = () => {
      const random = Math.floor(Math.random() * this.props.anecdotes.length)
      this.setState({ selected: random })
    }

    const voteAnecdote = (state) => () => {
        const newVotes = {...state.votes}
        newVotes[state.selected] += 1
        const mostVoted = Object.keys(newVotes).reduce((a, b) => newVotes[a] > newVotes[b] ? a : b);
        return (this.setState({ votes: newVotes, mostVoted: mostVoted }))
    }

    return (
      <div>
        < Header text={"Current anecdote:"} />
        < Anecdote anecdotes={this.props.anecdotes} anecdote={this.state.selected} state={this.state} />

        <button onClick={nextAnecdote}> next anecdote </button>
        <button onClick={voteAnecdote(this.state)}> vote </button>

        < Header text={"The anecdote with most votes:"} />
        < Anecdote anecdotes={this.props.anecdotes} anecdote={this.state.mostVoted} state={this.state} />
      </div>
    )}
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
