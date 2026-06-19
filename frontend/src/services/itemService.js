import api from "./api.js";

const itemService = {
  getItems: async (params = {}) => {
    const { data } = await api.get("/items", {
      params,
    });

    return data;
  },

  getItemById: async (id) => {
    const { data } = await api.get(`/items/${id}`);

    return data;
  },

  createItem: async (item) => {
    const { data } = await api.post("/items", item);

    return data;
  },

  updateItem: async (id, item) => {
    const { data } = await api.put(
      `/items/${id}`,
      item
    );

    return data;
  },

  deleteItem: async (id) => {
    const { data } = await api.delete(
      `/items/${id}`
    );

    return data;
  },

  getExpiredItems: async (params = {}) => {
    const { data } = await api.get(
      "/expired",
      {
        params,
      }
    );

    return data;
  },

  getDashboardStats: async () => {
    const { data } = await api.get(
      "/dashboard/stats"
    );

    return data;
  },
};

export default itemService;