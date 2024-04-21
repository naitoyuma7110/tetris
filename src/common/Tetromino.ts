/* 
  全テトリミノのタイル配置やIDの一覧などは定数としてこのモジュールのglobalに定義する

  tetrominos - 各種テトリミノのタイル配置の一覧定義 
  TETROMINO_TYPE - テトリミノタイプ<アルファベット>：ID<数字>の対応定義一覧
  TETROMINO_TYPE(type) - 上記テトリミノタイプからID(数値)を抽出しユニオン型のtype定義
*/

export type Point = [number, number] // フィールド上の座標(y,x)
export type TilePoints = Array<Point> // テトリミノが持つタイル配置

const tetrominos: Array<TilePoints> = [
  // 原点を(0,0)とした各種テトリミノのタイル配置を定義
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
    [-1, 0],
    [-1, 1]
  ]
] as const
// as const で明示的に変更不可

// テトリミノタイプ(アルファベット)の数字IDの紐づけを定義
const TETROMINO_TYPE = {
  I: 1, // I-テトリミノ（長いテトリミノ）
  O: 2, // O-テトリミノ（四角のテトリミノ）
  S: 3 // S-テトリミノ（S字のテトリミノ）
} as const

// keyof typeof TETROMINO_TYPE = "I" | "O" | "S" | "Z" | "J" | "L" | "T" (オブジェクト:TETROMINO_TYPEのkeyのユニオン型)
// (typeof TETROMINO_TYPE)[keyof typeof TETROMINO_TYPE] = 1 | 2 | 3 | 4 | 5 | 6 | 7 (↑に対応するvalueを抽出しユニオン型を定義)
export type TETROMINO_TYPE = (typeof TETROMINO_TYPE)[keyof typeof TETROMINO_TYPE]

/* 

  Tetrominoクラス

  @property type - テトリミノの数字ID
  @method getId - typeに応じたCSSクラスを返す静的メソッド
  @method getTilePoints - テトリミノのタイル配置情報を返す
  @method newRandomTetromino - ランダムなTetrominoインスタンスを返す静的メソッド

*/

export class Tetromino {
  private type: TETROMINO_TYPE

  private tilePoints: TilePoints

  constructor(type: TETROMINO_TYPE) {
    this.type = type
    this.tilePoints = tetrominos[this.type]
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

  // タイル配置情報へのgetアクセス
  get tiles(): TilePoints {
    return this.tilePoints
  }

  get tetrominoType() {
    return this.type
  }

  // タイル配置を回転後のものに更新する
  rotateTilePoints(): TilePoints {
    // TODO:回転処理を実行してthis.titlePointsを更新
    return this.tilePoints
  }

  // 自身のインスタンスをランダムに生成
  static newRandomTetromino(): Tetromino {
    const tetrominoTypes = tetrominos.length - 1 // 3種類
    const type = Math.floor(Math.random() * tetrominoTypes) + 1

    return new Tetromino(type as TETROMINO_TYPE)
  }
}
