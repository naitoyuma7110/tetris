import type { TETROMINO_TYPE } from '@/common/Tetromino'

/**
 * TETROMINO_TYPEからタイルを描画するためのCSSクラスを取得する
 * @param  type TETROMINO_TYPE - テトリミノタイプ
 * @returns {string} string - CSSクラス
 */
export const getBlockClass = (type: TETROMINO_TYPE): string => {
  if (type) {
    switch (type) {
      case 1:
        return 'block-i'
      case 2:
        return 'block-o'
      case 3:
        return 'block-s'
      case 4:
        return 'block-z'
      case 5:
        return 'block-j'
      case 6:
        return 'block-l'
      case 7:
        return 'block-t'
      default:
        return 'block-blank'
    }
  }
  return 'block-blank'
}
