import { reactive } from 'vue'
import { Tetromino } from './Tetromino'

export class TetrominoManager {
  stockedTetromino: Tetromino | undefined

  nextTetrominos: Tetromino[]

  activeTetromino: Tetromino

  constructor() {
    const setCount = 2
    const nextTetrominos: Tetromino[] = []
    for (let i = 1; i <= setCount; i++) {
      nextTetrominos.push(Tetromino.createRandomTetromino())
    }
    this.nextTetrominos = nextTetrominos
    this.activeTetromino = Tetromino.createRandomTetromino()
  }

  createActiveCopy() {
    return this.activeTetromino.copyInstance()
  }

  createActiveTetromino() {
    this.activeTetromino = this.nextTetrominos[0]
    this.nextTetrominos.shift()
    this.nextTetrominos.push(Tetromino.createRandomTetromino())
  }
}
