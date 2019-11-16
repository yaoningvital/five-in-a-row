import React from 'react'

function Square (props) {
  let className = 'square'
  if (props.win) {
    className += ' win'
  }
  return (
    <div className={className}>
      <button onClick={() => props.handleClick(props.index)}>
        {props.value}
      </button>
    </div>
  )
}

export default Square