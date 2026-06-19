import api from "./api.js";

const dashboardService = {
  getStats: async () => {
    const { data } = await api.get("/dashboard/stats");
    return data;
  },

  getCategoryBreakdown: async () => {
    const { data } = await api.get("/dashboard/category-breakdown");
    return data;
  },

  getRecentItems: async (limit = 5) => {
    const { data } = await api.get("/dashboard/recent-items", {
      params: { limit },
    });
    return data;
  },

  getLatestNotifications: async (limit = 5) => {
    const { data } = await api.get("/dashboard/latest-notifications", {
      params: { limit },
    });
    return data;
  },
};

export default dashboardService;