# オブジェクト指向でテトリスを作成

## テトリスのルールを整理(仕様)

ボード上をテトリミノが特定の時間毎に 1 ブロックずつ落下していく  
テトリミノはプレイヤーの操作により左右に移動できる(縦の移動は一旦おいておく)
ボード上で落下するテトリミノは１つだけ。
テトリミノは自分自身のタイルの底面がボードの底面にぶつかると停止する。
また底面が停止しているテトリミノ群にぶつかっても停止する。
側面が停止しているテトリミノ、もしくはボードの側面に触れるとそれ以上その方向に移動できない。
テトリミノが停止した時点で、ボード上の列の中に停止したテトリミノのタイルで占められる列があればその列のタイルは消滅する
消滅後、消滅した列を埋めるように直下が空白になったタイルは落下する
タイル列を消滅するとスコアを得る
ボード上を落下するテトリミノが停止、消滅があれば消滅後に次の新しいテトリミノが最上部から落下する

ボードは縦 10× 横 20 マス  
テトリミノは 7 種類あり 4 つのタイルを組み合わせて構成される

## オブジェクト設計

- テトリミノ

- フィールド

- ボード

- ゲーム
