import { createContext, useContext, useEffect, useState } from "react";
import { SignUp, Login } from "../api/Auth.controllers";
import { set } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { verifyToken } from "../api/Auth.controllers";
import { changePassword } from "../api/user.controller";

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
  const [Errores, setErrores] = useState(null)

 
  const logOut = () => {
    Cookies.remove("token");
    setUser(null);
    setisAuthenticated(false);
  };
useEffect(()=>{
  const time = setTimeout(()=>{
    setErrores(null)
  },3000)
  return ()=>{
    clearTimeout(time)
  }
},[Errores])

  const GetIn = async (data) => {
    try {
      const res = await Login(data);
   
      if (res.status === 200) {
        setisAuthenticated(true);
        setUser(res.data.data.user);
        Cookies.set("token", res.data.data.token);
        setLoading(false);
        return res;
      }
    } catch (error) {
   
      setLoading(false);
      setErrores(error.response.data)
      setisAuthenticated(false)
    }
  };
  const signup = async (user) => {
    try {
      const res = await SignUp(user);
      console.log(res.data)
      if (res) {
        if (res.data.status === 200) {
          setUser(res.data.message);
          Cookies.set("token", res.data.message.token);
          setisAuthenticated(true);
          setLoading(false);
          return res;
        }
      }
    } catch (error) {
     
      setErrores(error.response.data)
      setisAuthenticated(false)
      setLoading(false)
    }
    return false;
  };

  const PasswordChanger = async (newData)=>{
    try {
      const res = await changePassword(newData);
      if(res.status==200){
        setLoading(false);
        return 200;
      }
    } catch (error) {
      console.log(error)
      setErrores(error.response.data)
      
    }
     

  }

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setisAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyToken({ token: cookies.token });
        if(!res.data){
          setisAuthenticated(false);
          return;
        }
        setisAuthenticated(true);
        setUser(res.data.user);
        setLoading(false)
      } catch (error) {
        console.log(error);
        logOut();
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
        Errores,
        PasswordChanger
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
