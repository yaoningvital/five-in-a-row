import React from 'react'
import Board from './Board'
import '../index.scss'
import { calculateWinner } from '../utils'

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    
    let columnNum = parseInt((document.documentElement.clientWidth - 270) / 40)
    let rowNum = parseInt((document.documentElement.clientHeight - 80) / 40)
    
    this.state = {
      rowNum: rowNum,  // board的行数
      columnNum: columnNum,  // board的列数
      history: [
        {
          squares: Array(rowNum * columnNum).fill(null)
        }
      ],
      currentStep: 0, // 当前第几步
    }
    
    
  }
  
  render () {
    let history = this.state.history
    let current = history[this.state.currentStep]
    
    let winnerObj = calculateWinner(current.squares, this.state.rowNum, this.state.columnNum)
    // console.log('winner:', winner)
    let status;
    let winnerIndices = []
    if (winnerObj) {
      status = '赢家是：' + winnerObj.winner
      winnerIndices = winnerObj.indices
    } else {
      status = '下一步：' + (this.state.currentStep % 2  === 0 ? 'X' : 'O')
    }
    
    let moves = history.map((step, index) => {
      console.log(typeof index)
      let desc = index ? `回退到第${index}步` : '重新开始游戏'
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      )
    })
    
    return (
      <div className="game">
        <Board
          rowNum={this.state.rowNum}
          columnNum={this.state.columnNum}
          squares={current.squares}
          handleClick={this.handleClick}
          winnerIndices={winnerIndices}
        />
        <div className="btns">
          <div>
            {status}
          </div>
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    )
  }
  
  handleClick (index) {
    let history = this.state.history
    let current = history[this.state.currentStep]
    let squares = current.squares.slice()
    
    // 如果已经有赢家，或者这个格子已经下过棋了，则返回
    if (calculateWinner(squares, this.state.rowNum, this.state.columnNum) || squares[index]) return
    
    squares[index] = this.state.currentStep % 2 === 0 ? 'X' : 'O'
    
    this.setState({
      history: history.slice(0, this.state.currentStep + 1).concat([
        {
          squares: squares
        }
      ]),
      currentStep: this.state.currentStep + 1
    })
  }
  
  jumpTo (index) {
    if (index === 0) {
      this.setState({
        history: [
          {
            squares: Array(this.state.rowNum * this.state.columnNum).fill(null)
          }
        ],
        currentStep: 0
      })
    } else {
      this.setState({
        currentStep: index
      })
    }
  }
}

export default Game