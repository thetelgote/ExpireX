import api from "./api.js";

const authService = {
  register: async (userData) => {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },

  login: async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  },

  getProfile: async () => {
    const { data } = await api.get("/auth/profile");
    return data;
  },

  forgotPassword: async (email) => {
    const { data } = await api.post("/auth/forgot-password", {
      email,
    });

    return data;
  },

  resetPassword: async (token, password) => {
    const { data } = await api.post(
      `/auth/reset-password/${token}`,
      {
        password,
      }
    );

    return data;
  },

  updateProfile: async (profileData) => {
    const { data } = await api.put("/auth/profile", profileData);
    return data;
  },

  changePassword: async (passwordData) => {
    const { data } = await api.put(
      "/auth/change-password",
      passwordData
    );

    return data;
  },

  logout: async () => {
    return true;
  },
};

export default authService;