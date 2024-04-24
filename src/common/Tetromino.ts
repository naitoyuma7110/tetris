export type Point = [number, number]
export type TilePoints = Point[]

const tetrominos: TilePoints[] = [
  // 原点を(0,0)とした各種テトリミノのタイル配置を定義[y,x]
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
    [0, -1],
    [1, 0],
    [1, 1]
  ]
] as const
// as const で明示的に変更不可

// テトリミノタイプ(アルファベット)と数字IDの紐づけ定義
const TETROMINO_TYPE = {
  I: 1,
  O: 2,
  S: 3
} as const

// keyof typeof TETROMINO_TYPE = "I" | "O" | "S" | "Z" | "J" | "L" | "T" (オブジェクト:TETROMINO_TYPEのkeyのユニオン型)
// (typeof TETROMINO_TYPE)[keyof typeof TETROMINO_TYPE] = 1 | 2 | 3 | 4 | 5 | 6 | 7 (↑に対応するvalueを抽出しユニオン型を定義)
export type TETROMINO_TYPE = (typeof TETROMINO_TYPE)[keyof typeof TETROMINO_TYPE]

export class Tetromino {
  private type: TETROMINO_TYPE
  tilePoints: TilePoints
  pointOnField: Point

  constructor(type: TETROMINO_TYPE) {
    this.type = type
    this.tilePoints = tetrominos[this.type]
    this.pointOnField = [0, 5]
  }

  static getId(type: TETROMINO_TYPE): string {
    switch (type) {
      case TETROMINO_TYPE.I:
        return 'block-i'
      case TETROMINO_TYPE.O:
        return 'block-o'
      case TETROMINO_TYPE.S:
        return 'block-s'
      default:
        return ''
    }
  }

  get tilesOnfield(): TilePoints {
    const tilesOnfield = []

    for (const point of this.tilePoints) {
      const pointOnField: Point = [point[0] + this.pointOnField[0], point[1] + this.pointOnField[1]]
      tilesOnfield.push(pointOnField)
    }
    return tilesOnfield
  }

  get tetrominoType() {
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

  createCopy(): Tetromino {
    const newTetromino = new Tetromino(this.type)
    const copyTilePoints: TilePoints = this.tilePoints.map((row) => [...row])
    newTetromino.tilePoints = copyTilePoints
    newTetromino.pointOnField = this.pointOnField
    return newTetromino
  }

  // インスタンスをランダムに生成
  static newRandomTetromino(): Tetromino {
    const tetrominoTypes = tetrominos.length - 1 // 3種類
    const type = Math.floor(Math.random() * tetrominoTypes) + 1

    return new Tetromino(type as TETROMINO_TYPE)
  }
}
