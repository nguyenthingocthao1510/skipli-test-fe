"use-client";
import useSWR from "swr";
import { TCard } from "../../helpers/types/card";
import fetcher from "../fetcher";
import Cookies from "js-cookie";
import axios from "axios";

export const useGetAllCards = (boardId: string) => {
  const query = `/card/boards/${boardId}/cards`;
  const { data, error, isLoading, mutate } = useSWR<TCard[]>(query, fetcher);
  return { data, error, isLoading, mutate };
};

export const useGetCardDetail = (boardId: string, cardId: string) => {
  const query = `/card/boards/${boardId}/cards/${cardId}`;
  const { data, error, isLoading, mutate } = useSWR<TCard>(query, fetcher);
  return { data, error, isLoading, mutate };
};

export const cardApi = {
  getAllCardsByStatus: function (boardId: string, status: string) {
    const API_URL = process.env.REACT_APP_RESPONSE_API_URL;
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(
      `${API_URL}/card/boards/${boardId}/cards-by-status`,
      {
        status: status,
      },
      { headers }
    );
  },
  createCard: function (data: TCard, boardId: string) {
    const API_URL = process.env.REACT_APP_RESPONSE_API_URL;
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(
      `${API_URL}/card/boards/${boardId}/cards`,
      {
        name: data.name,
        description: data.description,
        status: data.status,
      },
      { headers }
    );
  },
  updateCard: function (data: TCard, boardId: string, cardId: string) {
    const API_URL = process.env.REACT_APP_RESPONSE_API_URL;
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    const newData = {
      name: data.name,
      description: data.description,
    };
    return axios.put(
      `${API_URL}/card/boards/${boardId}/cards/${cardId}`,
      newData,
      {
        headers,
      }
    );
  },
};
