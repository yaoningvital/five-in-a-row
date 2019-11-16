import React from 'react'
import Square from './Square'
import { generateArray } from '../utils'

class Board extends React.Component {
  render () {
    let {rowNum, columnNum, squares, handleClick, winnerIndices} = this.props
    let indicesArr = generateArray(rowNum, columnNum)
    
    return (
      <div className="board">
        {
          indicesArr.map((rowArr, rowIndex) => {
            return (
              <div className="board-row" key={rowIndex}>
                {
                  rowArr.map((itemNo, itemIndexInRow) => {
                    return (
                      <Square
                        key={itemIndexInRow}
                        value={squares[itemNo]}
                        index={itemNo}
                        handleClick={handleClick}
                        win={winnerIndices.includes(itemNo)}
                      />
                    )
                  })
                }
              </div>
            )
          })
        }
      
      </div>
    );
  }
}

export default Board
