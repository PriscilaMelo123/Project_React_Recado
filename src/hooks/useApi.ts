/* eslint-disable no-unreachable */
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const useApi = () => ({
  //REVISAO-----NAO PRECISA DE VALIDATETOKEN
  validateToken: async (token: string) => {
    const response = await api.get(`/task/readTasksByUserId?token=${token}`);
    return response.data;
  },
  signin: async (name: string, pass: string) => {
    const response = await api.post("/user/login", { name, pass });
    return response.data;
  },
  signup: async (name: string, pass: string, Rpass: string) => {
    const response = await api.post("/user", { name, pass, Rpass });
    return response.data;
  },

  createTask: async (description: string, detail: string, token: string) => {
    const response = await api.post("/task/", { description, detail, token });
    return response.data;
  },

  loadTask: async (token: string) => {
    const response = await api.get(`/task/readTasksByUserId?token=${token}`);
    return response.data;
  },

  logout: async () => {
    return { status: true };
    const response = await api.post("/logout");
    return response.status;
  },

  deletTask: async (id: string, token: string) => {
    const response = await api.delete(`/task/${id}?token=${token}`);
    return response.data;
  },

  editTask: async (
    id: string,
    description: string,
    detail: string,
    token: string
  ) => {
    const response = await api.put("/task/", {
      id,
      description,
      detail,
      token,
    });
    debugger;
    console.log(response);
    return response.data;
  },
});
