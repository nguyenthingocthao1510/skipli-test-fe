import Cookies from "js-cookie";

const API_BASE = process.env.REACT_APP_RESPONSE_API_URL || "";

const fetcher = (url: string) => {
  const token = Cookies.get("token");
  const apiUrl = url.startsWith("http") ? url : `${API_BASE}${url}`;
  return fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Connection failed!");
    // return res.json().then((json) => json.boards);
    return res.json();
  });
};

export default fetcher;
