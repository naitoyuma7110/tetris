export type Point = [number, number]
export type TilePoints = Point[]

const tetrominos: TilePoints[] = [
  // 原点を(0,0)とした各種テトリミノのタイル配置を定義[y,x]
  // 1から始まるIDと紐づけたいので配列1番目にダミーを設置(使用しない)
  [[0, 0]],
  [
    [0, 0],
    [0, -1],
    [0, 1],
    [0, 2]
  ],
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
  ],
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, -1]
  ],
  [
    [0, 0],
    [0, 1],
    [0, -1],
    [1, -1]
  ],
  [
    [0, 0],
    [0, -1],
    [0, 1],
    [1, 1]
  ],
  [
    [0, 0],
    [0, 1],
    [0, -1],
    [1, 0]
  ]
] as const

const TETROMINO_TYPE = {
  I: 1,
  O: 2,
  S: 3,
  Z: 4,
  J: 5,
  L: 6,
  T: 7
} as const

export const DROP_POINT: Point = [0, 5]

export type TETROMINO_TYPE = (typeof TETROMINO_TYPE)[keyof typeof TETROMINO_TYPE]

export class Tetromino {
  private type: TETROMINO_TYPE
  private tilePoints: TilePoints
  private pointOnField: Point

  constructor(type: TETROMINO_TYPE) {
    this.type = type
    this.tilePoints = tetrominos[this.type]
    this.pointOnField = [0, 5]
  }

  get tilesOnfield(): TilePoints {
    const tilesOnfield = []

    for (const point of this.tilePoints) {
      const pointOnField: Point = [point[0] + this.pointOnField[0], point[1] + this.pointOnField[1]]
      tilesOnfield.push(pointOnField)
    }
    return tilesOnfield
  }

  get tetrominoType(): TETROMINO_TYPE {
    return this.type
  }

  // タイル配置を90度右回転後のものに更新する
  rotate(): void {
    const rotatedPoints = []

    for (const [y, x] of this.tilePoints) {
      // 90度右回転
      const newPoint: Point = [-x, y]
      rotatedPoints.push(newPoint)
    }

    this.tilePoints = rotatedPoints
  }

  shift(y: number, x: number): void {
    const newY = this.pointOnField[0] + y
    const newX = this.pointOnField[1] + x

    this.pointOnField = [newY, newX]
  }

  copyInstance(): Tetromino {
    const newTetromino = new Tetromino(this.type)
    newTetromino.tilePoints = this.tilePoints.map((row) => [...row])
    newTetromino.pointOnField = this.pointOnField
    return newTetromino
  }

  static newRandomTetromino(): Tetromino {
    const tetrominoTypes = tetrominos.length - 1
    const type = Math.floor(Math.random() * tetrominoTypes) + 1

    return new Tetromino(type as TETROMINO_TYPE)
  }
}
