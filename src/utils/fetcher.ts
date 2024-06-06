import axios from "axios"
export const fetcher = (url: string) => axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }).then(res => res.data);