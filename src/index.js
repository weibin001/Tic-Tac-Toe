import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App';
import * as serviceWorker from './serviceWorker'

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick({ value: 'X' })}
      >
        {this.props.value}
        {/* TODO */}
      </button>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return false
}
class Board extends React.Component {
  // handleClick(i) {
  //   const squares = this.state.squares.slice()
  //   if (calculateWinner(squares) || squares[i]) {
  //     return
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O'
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext
  //   })
  // }

  renderSquare(i) {
    // console.log(this.props)
    return (
      <Square
        value={this.props.value[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    // let status = 'Next player: X'
    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
    //console.log(history)
  }
  jumpTo(index) {
    //console.log(index)
    this.setState({
      stepNumber: index,
      xIsNext: index % 2 === 0
    })
  }
  render() {
    const history = this.state.history
    const current = (history.length > 0 && history[this.state.stepNumber]) || []
    let status = 'Next player: X'
    const winner = calculateWinner(current.squares)
    const move = history.map((item, index) => {
      const desc = index ? `Go to move # ${index}` : `Go to game start`
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      )
    })
    if (winner) {
      status = `Winner:${winner}`
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board value={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{move}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
