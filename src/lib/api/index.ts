import axios from "axios";

// axiosのデフォルトのリクエスト先を設定
const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL });

// リクエストヘッダのデフォルト値を設定
api.defaults.headers.common['Content-Type'] = 'application/json';

// 外部から利用できるにする
// 例. api.post("/signup") -> localhost:xxxx/signupにリクエストを送信
export default api;