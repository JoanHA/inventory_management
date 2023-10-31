import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import {FaUserCircle}  from "react-icons/fa"
function Sidebar() {
  const { user } = useAuth();
  const [logUser,setLogUser] = useState({});
 
  useEffect(() => {
    setLogUser(user);
  }, [user]);
  const history = useLocation();

  useEffect(() => {
    // Add a listener to respond to URL change
    const urlActual = history.pathname;

    if (urlActual == "/login" || urlActual == "/register") {
      document.getElementById("sidebar").style.display = "None";
    } else {
      document.getElementById("sidebar").style.display = "block";
    }
  }, [history]);

  
  return (
    <div id="sidebar">
        <div
        className="h-100 px-3"
          style={{
            width: "75px",
            backgroundColor: "#212529",
            color: "#fff",
            height: "100%",
          }}
        >
          <div className="sidebarHeader  d-flex  flex-column align-items-center">
            <div className="icon py-4"><FaUserCircle size={"3.5rem"}/></div>
            <h6>{logUser && (logUser.username)}</h6>
          </div>
          <div></div>
        </div>
    
    </div>
  );
}

export default Sidebar;
