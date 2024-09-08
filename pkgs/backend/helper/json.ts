/**
 * Base64エンコードされたデータをデコードし、JSONとして解析する関数
 */
export function decodeBase64Json(base64Data: string): object {
  // 'data:application/json;base64,' の部分を削除して純粋なBase64データを取得
  const base64String = base64Data.replace(
    /^data:application\/json;base64,/,
    ""
  );

  // Base64データをデコードしてバイナリデータを取得
  const jsonString = Buffer.from(base64String, "base64").toString("utf-8");

  // デコードされた文字列をJSONオブジェクトとして解析
  return JSON.parse(jsonString);
}
