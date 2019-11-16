export function generateArray (rowNum, columnNum) {
  let finalArray = []
  for (let i = 0; i < rowNum; i++) {
    let innerArray = []
    for (let j = 0; j < columnNum; j++) {
      innerArray.push(columnNum * i + j)
    }
    finalArray.push(innerArray)
  }
  
  return finalArray
}

export function calculateWinner (squares, rowNum, columnNum) {
  // 先把squares中有值的索引找出来
  let filled = {
    // 0: 'X',
    // 5: 'O',
  }
  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) {
      filled[i] = squares[i]
    }
  }
  // console.log('filled:', filled)
  
  for (let key in filled) {
    let permutation = winablePermutation(+key, rowNum, columnNum)
    // console.log('permutation:', permutation)
    for (let i = 0; i < permutation.length; i++) {
      let [a, b, c, d, e] = permutation[i]
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c] === squares[d] && squares[d] === squares[e]) {
        return {
          winner: squares[a],
          indices: [a, b, c, d, e]
        }
      }
    }
  }
  return null
}

// 基于给定的棋子所在的index，返回以它为起点的向右、向下、向右下角方向的组合方式
// var return=[
//   [0,1,2,3,4],
//   [0...],
// ]

function winablePermutation (index, rowNum, columnNum) {
  let permutation = [] //最后返回的
  
  // 先算出当前格子所在的行数、列数
  let rowIndex = parseInt(index / columnNum) // 所在行的索引
  let columnIndex = index % columnNum // 所在列的索引
  
  // 如果向右延伸4格，还在棋盘内的话，将这个组合推送进去
  if (columnIndex + 4 <= columnNum - 1) {
    let p = []
    for (let i = index; i < index + 5; i++) {
      p.push(i)
    }
    permutation.push(p)
  }
  
  // 如果向下延伸4格，还在棋盘内，将这个组合推送进去
  if (rowIndex + 4 <= rowNum - 1) {
    let p = []
    for (let i = 0; i < 5; i++) {
      p.push(index + i * columnNum)
    }
    permutation.push(p)
  }
  
  // 如果向右下角方向延伸4格，还在棋盘内的话
  if ((columnIndex + 4 <= columnNum - 1) && (rowIndex + 4 <= rowNum - 1)) {
    let p = []
    for (let i = 0; i < 5; i++) {
      p.push(index + i * columnNum + i)
    }
    permutation.push(p)
  }
  
  return permutation
}