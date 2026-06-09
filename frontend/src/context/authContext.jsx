import { createContext, useContext, useReducer } from "react";
import api from "../services/api.js";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return action.payload;

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { user: null, token: null };

    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    dispatch({
      type: "LOGIN",
      payload: {
        token: res.data.data.token,
        user: res.data.data.user
      }
    });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);