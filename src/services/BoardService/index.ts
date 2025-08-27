"use client";
import useSWR from "swr";
import { Board } from "../../helpers/types/board";
import fetcher from "../fetcher";
import axios from "axios";
import Cookies from "js-cookie";
import { UserLogin } from "../../helpers/types/login";

const useGetBoards = () => {
  const query = "/board/boards";
  const { data, error, mutate, isLoading } = useSWR<Board[]>(query, fetcher);
  return { data, error, mutate, isLoading };
};

export const boardApi = {
  createBoard: function (data: Board) {
    const API_URL = process.env.REACT_APP_RESPONSE_API_URL;
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(
      `${API_URL}/board/boards`,
      {
        name: data.name,
        description: data.description,
      },
      { headers }
    );
  },
  invitePeople: function (email: string, boardId: string) {
    const API_URL = process.env.REACT_APP_RESPONSE_API_URL;
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(
      `${API_URL}/card/boards/${boardId}/invite`,
      {
        email_member: email,
        cardId: boardId,
      },
      { headers }
    );
  },
  updateBoard: function (data: Board) {
    const API_URL = process.env.REACT_APP_RESPONSE_API_URL;
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    const newData = {
      name: data.name,
      description: data.description,
    };
    return axios.put(`${API_URL}/board/boards/${data.id}`, newData, {
      headers,
    });
  },
  deleteBoard: function (boardId: string) {
    const API_URL = process.env.REACT_APP_RESPONSE_API_URL;
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(`${API_URL}/board/boards/${boardId}`, {
      headers,
    });
  },
};

export { useGetBoards };
