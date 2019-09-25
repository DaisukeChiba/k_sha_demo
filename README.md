# k_sha.js

役職ランクのリスト、採用コースランクのリスト、参加者のリスト、最大倍率、支払総額を引数にして呼び出すと、入力の参加者テーブルに計算の中間値や傾斜配分の計算結果に関する要素を付加したリストを返却する。

# 動作確認

下記ファイルを同一ディレクトリに配置し、`k_sha.html`をブラウザで開く。

- `k_sha.js`：本体。
- `data.js`：入力データのサンプル。
- `k_sha.html`：動作確認用のHTMLファイル。
  - `k_sha.js`と`data.js`を読み込み、入力データと出力データの内容を表示する。
- `k_sha_form.html`：テスト用に入力値を変更して動作確認できるHTMLファイル。
  - `data.js`を読み込み、入力フォームに反映。
  - 入力フォームの値を任意で変更し、`傾斜計算`を押下。
  - `k_sha.js`で傾斜計算を行い、結果を画面に表示する。

# 使い方

```js
const array = k_sha(rankTable, courseTable, maxRate, payment, attendTable);
```
入力のattendTableに中間値や計算結果の要素を付加したものが返却される。

入力値にエラーがある場合、`[{'ERROR': エラーメッセージ}]`が返却される。

## 入力

### rankTable：役職ランクテーブル

- pos：役職
- rank：ランク
- cor：採用コース補正…trueのとき採用コースによるランクの加算対象となる。

※ランクが1つ飛ばしになっているのは、採用コースがグローバルのときに傾斜を同一役職より上、直上役職より下にするため。

|pos|rank|cor  |
|---|----|-----|
|M  |1   |false|
|FSN|3   |true |
|SN |5   |true |
|KD |7   |true |
|CHD|7   |true |
|TTK|9   |true |
|K  |11  |false|
|CH |11  |false|
|TTJ|13  |false|
|J  |13  |false|
|TTB|15  |false|
|BB |15  |false|
|B  |17  |false|
|SH |17  |false|

---

### courseTable：採用コースランクテーブル

- course：採用コース…globalまたはarea。
- rank：ランク…採用コース補正対象の役職のときランクに加算。

|course|rank|
|------|----|
|global|1   |
|area  |0   |

---

### attendTable：参加者テーブル

- no：入力順…入力は不要、フロント側で付加する。
- name：氏名
- pos：役職
- course：採用コース…globalまたはarea。
- guest：ゲスト…金額0円とするゲスト出席者はtrue。
- round：500円四捨五入…会費を500円単位に四捨五入する出席者はtrue。
- organizer：幹事…幹事となる1名のみにtrue。残った端数は幹事に寄せられる。
- adjustFee：調整金額…会費金額を手動で調整する場合に支払金額を入力。

|no|name|pos|course|guest|round|organizer|adjustFee|
|--|----|---|------|-----|-----|---------|---------|
|1 |佐藤|M  |area  |false|false|false    |0        |
|2 |鈴木|FSN|area  |false|false|true     |0        |
|3 |高橋|FSN|global|false|true |false    |0        |
|4 |田中|SN |area  |false|false|false    |5000     |

---

### maxRate：最大倍率 (number)

- 最下位の役職と最上位の役職での会費の倍率(目安)を入力。
- 1以上の値。

---

### payment：支払総額 (number)

- 支払金額の総額を入力。
- 1以上の整数値。

---

## 出力

### attendTable：参加者テーブル

入力のattendTableに下記要素が追加されて返却される。

- totalRank：合計ランク…出席者の役職と採用コースから求めたランクの合計値。
- rate：倍率…合計ランクに応じて適用される倍率を取得。
- percentage：支払割合…倍率をもとに、支払総額に占める支払金額の割合を算出。
- fee1：調整前金額1…支払総額から調整金額の合計を引いた調整後総額をもとに、支払割合に基づく支払金額を100円単位で算出。
- fee2：調整前金額2…500円四捨五入の対象者を500円単位に丸める。
- alloc：配分対象…調整前金額2の計算までに発生した端数を分配する対象者。
- allocFee：配分金額…調整前金額2の計算までに発生した端数を分配する金額。
- fee3：調整前金額3…調整前金額2の計算までに発生した端数を分配した金額。
- fee4：会費金額…端数を幹事に加算した結果で会費金額の最終計算結果。
- feeRate：支払倍率…会費金額が最小の出席者に対する会費金額の倍率を表示。
