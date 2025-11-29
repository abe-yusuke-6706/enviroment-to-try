import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"
import Cookies from "js-cookie"

const options = {
  ignoreHeaders: true 
}

let client = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true
});

client = applyCaseMiddleware(client, options);

client.interceptors.request.use((config) => {
  const accessToken = Cookies.get("_access_token");
  const clientId = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  if (accessToken && clientId && uid) {
    config.headers["access-token"] = accessToken;
    config.headers["client"] = clientId;
    config.headers["uid"] = uid;
  }

  return config;
});

client.interceptors.response.use((response) => {
  const accessToken = response.headers["access-token"];
  const clientId = response.headers["client"];
  const uid = response.headers["uid"];

  if (accessToken ?? clientId ?? uid) {
    if (accessToken) Cookies.set("_access_token", accessToken);
    if (clientId) Cookies.set("_client", clientId);
    if (uid) Cookies.set("_uid", uid);
  }

  return response;
});

export default client
