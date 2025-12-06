import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"
import Cookies from "js-cookie"

let client = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true //ブラウザがCookieの送受信を行うことを宣言
});

const options = {
  ignoreHeaders: true //headersには適用しない
}

client = applyCaseMiddleware(client, options);
//JSONの返還を自動でしてくれる
// Rails は snake_case
// JS は camelCase

client.interceptors.request.use((config) => { //client.interceptors.requestでリクエスト送信前に割り込みたい処理を書く
                                              //.useまでつけることで、リクエスト直前に実行したい関数を定義できる
  const accessToken = Cookies.get("_access_token");
  const clientId = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  if (accessToken && clientId && uid) { //既存の認証情報がある場合はconfigに追加
    config.headers["access-token"] = accessToken;
    config.headers["client"] = clientId;
    config.headers["uid"] = uid;
  }

  return config; //return configしないと、認証情報がconfigに適用されない
});

client.interceptors.response.use((response) => { //client.interceptors.responseの場合は受信直後に割り込みたい処理が書けます
  const accessToken = response.headers["access-token"];// responseの認証情報を取得し、既存のものを更新
  const clientId = response.headers["client"];
  const uid = response.headers["uid"];

  if (accessToken ?? clientId ?? uid) {
    if (accessToken) Cookies.set("_access_token", accessToken);
    if (clientId) Cookies.set("_client", clientId);
    if (uid) Cookies.set("_uid", uid);
  }

  return response;//return responseで認証情報の更新を確定
});

export default client
