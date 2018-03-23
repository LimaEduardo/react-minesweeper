import React, { Component } from 'react'
import Cell from './Cell'

const styles = {
  root: {
    width: 400,
    height: 400,
    display: 'flex',
    flexWrap: "wrap",
  },
}

export class GameBoard extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      board: undefined,
      ready: false
    }
    
  }

  componentWillMount(){
    this.distributeMines(this.props.config).then((board) => {
      this.setNumbers(board).then((finalBoard) => {
        this.setState({board: finalBoard, ready:true})
      })
    })
  }


  setNumbers(board){
    return new Promise((resolve, reject) => {
      for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
          if(board[i][j] === -1){
            continue;
          }
          let numberOfMines = 0
          for(var m = i-1;  m <= i+1; m++){
            for (var n = j-1; n <= j+1; n++){
              if (board[m] === undefined || board[m][n] === undefined || (m === i && n === j)){
                continue
              }
              if (board[m][n] === -1) {
                numberOfMines += 1
              }
            }
          }
          board[i][j] = numberOfMines
        }
      }
      resolve(board)
    })
  }

  distributeMines(config){
    return new Promise((resolve, reject) => {
      const {lines, columns, mines} = config
  
      var newBoard = new Array(lines);
      for (var i = 0; i < newBoard.length; i++) {
        newBoard[i] = new Array(columns);
      }
      let minesLeft = mines
      while (minesLeft > 0){
        let line = Math.trunc((Math.random() * lines * 42) % lines)
        let column = Math.trunc((Math.random() * columns * 42) % columns)
        if (newBoard[line][column] === -1){
          continue;
        }
        newBoard[line][column] = -1
        minesLeft -= 1
      }
      resolve(newBoard)
    })
  }


  render() {
    const {board, ready} = this.state

    if(ready){
      styles.cell = {
        display: "inline-block",
        flexGrow: 1,
        width: `calc(100% * (1/${board[0].length}))`
      }
    }

    return (
      <div style={styles.root}>
        {ready && board ? (board.map((lines, indexLine) => (
          lines.map((column, indexColumn) => (
              <div style={styles.cell} >
                <Cell value={column} />
              </div>
          ))
        ))) : null}
      </div>
    )
  }
}

export default GameBoard
