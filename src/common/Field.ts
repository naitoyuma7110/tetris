import type { Tetromino } from '@/common/Tetromino'
import { DROP_POINT } from '@/common/Tetromino'

export type FieldData = number[][]

const row = 20
const column = 10

export class Field {
  private field: FieldData
  private totalRemovedColumn: number = 0

  constructor() {
    const fieldData = new Array<Array<number>>(row)

    for (let i = 0; i < row; i++) {
      const fieldColumn = new Array(column).fill(0)
      fieldData[i] = fieldColumn
    }

    this.field = fieldData
  }
  /**
   * クラスが持つFieldのコピーを生成し返す
   * @returns {FieldData} Fieldのコピー(値渡し)
   */
  private getFieldDeepCopy(): FieldData {
    const deepCopyField = this.field.map((row) => [...row])
    return deepCopyField
  }

  /**
   * クラスが持つField参照用のGetter
   * @returns {FieldData} 変更不可のField
   */
  get fieldData(): FieldData {
    return this.field
  }

  /**
   * クラスが持つtotalRemovedColumnを使用し累積消去列数から現在のスコアを返す
   * スコアの計算は暫定的に×100しているだけ
   * @returns {number} 消去列数に応じた点数
   */
  get score(): number {
    return this.totalRemovedColumn * 100
  }

  /**
   * テトリミノ落下口までタイルが堆積した場合、ゲームオーバーの判定を行う
   * @returns {boolean} ゲームオーバーか否か
   */
  get isGameOver(): boolean {
    return this.field[DROP_POINT[0]][DROP_POINT[1]] !== 0
  }

  /**
   * クラスのfiledを参照しタイルで埋まっている列を消滅する
   * 消滅した列より上部の全ての列を下方にシフトしfiledを更新する
   */
  private removeColumn() {
    // 列に0以外のcolを含むか判定し削除対象の列インデックスを保持
    const columnsToRemove: number[] = []

    for (let row = 0; row < this.field.length; row++) {
      let isAllTile = true
      for (let col = 0; col < this.field.length; col++) {
        if (this.field[row][col] === 0) {
          isAllTile = false
          break
        }
      }
      if (isAllTile) {
        columnsToRemove.push(row)
      }
    }

    // 削除対象の列を削除し配列を下方にシフトする
    const fieldRemovedColum: number[][] = []

    for (let row = 0; row < this.field.length; row++) {
      let newRow: number[]
      if (!columnsToRemove.includes(row)) {
        newRow = this.field[row]
        fieldRemovedColum.push(newRow)
      }
    }

    for (let i = 1; i <= columnsToRemove.length; i++) {
      const blankRow: number[] = Array(column).fill(0)
      fieldRemovedColum.unshift(blankRow)
    }

    this.totalRemovedColumn += columnsToRemove.length
    this.field = fieldRemovedColum
  }

  /**
   *
   * @param columnVanish インスタンスコピー時に列消滅を実行するか指定するbool値
   * @returns {Field} クラスのコピーを返す
   */
  copyInstance(columnVanish?: boolean): Field {
    const newField = new Field()
    newField.field = this.getFieldDeepCopy()
    newField.totalRemovedColumn = this.totalRemovedColumn

    if (columnVanish) {
      newField.removeColumn()
    }

    return newField
  }

  /**
   * テトリミノインスタンスを受け取り、それがクラスのFieldに描画できるか判定
   * フィールドに堆積したタイル情報を保持するフィールドクラスで実行する事を想定している
   * @param  newTetromino  描画したいテトリミノクラス
   * @returns {boolean} 描画可能か否か
   */
  isCollision(newTetromino: Tetromino): boolean {
    const points = newTetromino.tilesOnfield
    const copyField = this.getFieldDeepCopy()
    let isCollision = false

    points.forEach((point) => {
      // copyField[row]の存在チェック後、copyField[row][col]のチェックを実行
      if (!copyField[point[0]] || copyField[point[0]][point[1]] !== 0) {
        isCollision = true
      }
    })

    return isCollision
  }

  createFieldWithRenderTetromino(tetromino: Tetromino): Field {
    const points = tetromino.tilesOnfield
    const newField = this.copyInstance()

    points.forEach((point) => {
      newField.fieldData[point[0]][point[1]] = tetromino.tetrominoType
    })
    return newField
  }
}
