import api from "./api.js";

const notificationService = {
  getNotifications: async () => {
    const { data } = await api.get(
      "/notifications"
    );

    return data;
  },

  markAsRead: async (id) => {
    const { data } = await api.put(
      `/notifications/${id}`
    );

    return data;
  },

  markAllAsRead: async () => {
    const { data } = await api.put(
      "/notifications/read-all"
    );

    return data;
  },

  deleteNotification: async (id) => {
    const { data } = await api.delete(
      `/notifications/${id}`
    );

    return data;
  },
};

export default notificationService;