import fetch from "fetch-everywhere";
export const API_URL_ROOT = "http://192.168.2.17/Tutorial/apis/index.php?";

//get api call
export async function get(url) {
  return await fetch(`${API_URL_ROOT}${url}`, {});
}