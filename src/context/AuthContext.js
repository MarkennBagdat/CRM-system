import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    if (state.user) {
      localStorage.setItem("accessToken", state.user.accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [state.user]);

  const login = async (email, password, rememberMe) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post("http://localhost:8080/v1/auth", {
        email,
        password,
      });
      const token = response.data.accessToken;
      if (token) {
        const user = { email, accessToken: token };
        if (rememberMe) {
          localStorage.setItem("username", email);
          localStorage.setItem("password", password);
        }
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } else {
        throw new Error("No token returned");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };

  const register = async (email, password) => {
    try {
      await axios.post("http://localhost:8080/v1/auth/register", {
        email,
        password,
      });
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
