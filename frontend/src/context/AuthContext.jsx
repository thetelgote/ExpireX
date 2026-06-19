import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import authService from "../services/authService.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [isLoading, setIsLoading] =
    useState(true);

  const isAuthenticated = !!token;

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const profile =
          await authService.getProfile();

        setUser(profile.user || profile);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const login = async (
    email,
    password
  ) => {
    const response =
      await authService.login({
        email,
        password,
      });

    const jwt =
      response.token ||
      response.accessToken;

    localStorage.setItem(
      "token",
      jwt
    );

    setToken(jwt);

    setUser(response.user);

    return response;
  };

  const register = async (
    userData
  ) => {
    const response =
      await authService.register(
        userData
      );

    const jwt =
      response.token ||
      response.accessToken;

    if (jwt) {
      localStorage.setItem(
        "token",
        jwt
      );

      setToken(jwt);
    }

    setUser(response.user);

    return response;
  };

  const logout = async () => {
    try {
      if (authService.logout) {
        await authService.logout();
      }
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  };

  const updateUser = (
    updatedUser
  ) => {
    setUser(updatedUser);
  };

  // Profile.jsx expects `setUser` directly from the context;
  // expose it alongside `updateUser` so both call sites work.
  const setUserSafely = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        token,

        isAuthenticated,

        isLoading,

        login,

        register,

        logout,

        updateUser,

        setUser: setUserSafely,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;