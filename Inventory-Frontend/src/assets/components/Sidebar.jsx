import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import { GiAutoRepair } from "react-icons/gi";
import { PiDesktopTower } from "react-icons/pi";
import logo from "../img/logoBioart.png";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

function Sidebar() {
  const { user } = useAuth();
  
  const [logUser, setLogUser] = useState({});
  const [home, setHome] = useState(true);
  const [userPage, setuserPage] = useState(false);
  const [eventsPage, setEventsPage] = useState(false);
  const [equipPage, setEquipPage] = useState(false);
  const [addPage, setAddPage] = useState(false);

  function changer(toChange) {
    switch (toChange) {
      case "home":
        setHome(true);
        setAddPage(false);
        setEquipPage(false);
        setEventsPage(false);
        setuserPage(false);
        break;
      case "userPage":
        setHome(false);
        setAddPage(false);
        setEquipPage(false);
        setEventsPage(false);
        setuserPage(true);

        break;
      case "eventsPage":
        setHome(false);
        setAddPage(false);
        setEquipPage(false);
        setEventsPage(true);
        setuserPage(false);

        break;
      case "equipPage":
        setHome(false);
        setAddPage(false);
        setEquipPage(true);
        setEventsPage(false);
        setuserPage(false);

        break;
      case "addPage":
        setHome(false);
        setAddPage(true);
        setEquipPage(false);
        setEventsPage(false);
        setuserPage(false);

        break;
      default:
        break;
    }
  }
  useEffect(() => {
    setLogUser(user);
  }, [user]);
  const history = useLocation();

  useEffect(() => {
    // Add a listener to respond to URL change
    const urlActual = history.pathname;

    if (urlActual == "/login" || urlActual == "/register") {
      document.getElementById("sidebarContainer").style.display = "None";
    } else {
      document.getElementById("sidebarContainer").style.display = "block";
    }
  }, [history]);

  return (
    <div id="sidebarContainer">
      <div id="sidebar" className="h-100 ">
        <div className="bioartTitle w-100 py-2">
          <div className=" logoContainer  d-flex justify-content-center align-items-center    py-1 rounded">
            <img src={logo} alt="" width={60} className="  img-logo  " />
            <span id="logoName" className="tittles ">
              <h3 className="px-3 logoTitle mb-0">Bioart</h3>
            </span>
          </div>
        </div>

        <div className="sidebarHeader  d-flex  flex-row  justify-content-between align-items-center">
          <div className="icon  d-flex  flex-row py-2 px-3 align-items-center ">
            <FaUserCircle size={"2.5rem"} className="" />
            <h5 className="tittles px-2 mb-0 ">
              {logUser && logUser.username}
            </h5>
          </div>

          <div>
            <Link style={{ color: "#fff" }} to={user && (`/editUser/${user.id}`)} className="tittles">
              <LiaEditSolid size={"2.2rem"}></LiaEditSolid>
            </Link>
          </div>
        </div>

        <div className="items">
          <ul className="list-unstyled">
            <li className="sidebarLi">
              <Link
                to="/"
                className={
                  home == true ? " SidebarLinks active" : " SidebarLinks"
                }
                onClick={() => {
                  changer("home");
                }}
              >
                <HiOutlineHome size={"2rem"} />
                <span className="tittles"> Home</span>
              </Link>
            </li>

            { user ? user.rol == 271 && (
              <>
                <li className="sidebarLi">
                  <Link
                    to="/userManagement"
                    className={
                      userPage == true
                        ? " SidebarLinks active"
                        : " SidebarLinks"
                    }
                    onClick={() => {
                      changer("userPage");
                    }}
                  >
                    <FaUsers size={"2rem"} />
                    <span className="tittles"> Usuarios</span>
                  </Link>
                </li>
              </>
            ):""}

            <li className="sidebarLi">
              <Link
                to="/events"
                className={
                  eventsPage == true ? " SidebarLinks active" : " SidebarLinks"
                }
                onClick={() => {
                  changer("eventsPage");
                }}
              >
                <GiAutoRepair size={"2rem"} />
                <span className="tittles"> Eventos</span>
              </Link>
            </li>
            <li className="sidebarLi">
              <Link
                to="/equipments"
                className={
                  equipPage == true ? " SidebarLinks active" : " SidebarLinks"
                }
                onClick={() => {
                  changer("equipPage");
                }}
              >
                <PiDesktopTower size={"2rem"} />
                <span className="tittles">Equipos</span>
              </Link>
            </li>
            <li className="sidebarLi">
              <Link
                to="/create"
                className={
                  addPage == true ? " SidebarLinks active" : " SidebarLinks"
                }
                onClick={() => {
                  changer("addPage");
                }}
              >
                <AiOutlineAppstoreAdd size={"2rem"} />
                <span className="tittles">Añadir equipos</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
