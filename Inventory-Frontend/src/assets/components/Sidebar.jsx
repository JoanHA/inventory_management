import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  const [show, setShow] = useState(false);

  useEffect(() => {
    const actualUrl = window.location.href;
    const url = actualUrl.split("/");
    console.log(url[url.length - 1]);
    if (url[url.length - 1] == "login" || url[url.length - 1] == "register") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);
  return (
    <div>
      {show  == true && (
        <div
          style={{
            width: "75px",
            backgroundColor: "#212529",
            color: "#fff",
            height: "100vh",
          }}
        >
          <div className="sidebarHeader">
            <div className="icon"></div>
            <h6>Usuario:{}</h6>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
