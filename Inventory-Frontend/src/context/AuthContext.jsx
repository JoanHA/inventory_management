import { createContext, useContext, useEffect, useState } from "react";
import { SignUp, Login } from "../api/Auth.controllers";
import { set } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { verifyToken } from "../api/Auth.controllers";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setisAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  const logOut = () => {
    Cookies.remove("token");
    setUser(null);
    setisAuthenticated(false);
  };

  const GetIn = async (data) => {
    try {
      const res = await Login(data);
      if (res.status === 200) {
        setisAuthenticated(true);
        setUser(res.data.user);
        Cookies.set("token", res.data.token);
        setLoading(false);
        return res;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const signup = async (user) => {
    try {
      const res = await SignUp(user);
      if (res) {
        if (res.status === 200) {
          setUser(res.data);
          Cookies.set("token", res.data.token);
          setisAuthenticated(true);
          setLoading(false);
          return res;
        }
      }
    } catch (error) {
      console.log(error.data);
    }
    return false;
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setisAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
      
        setisAuthenticated(true);
        setLoading(false);
        // const res  =await verifyToken(cookies.token)
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        GetIn,
        loading,
        logOut,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
