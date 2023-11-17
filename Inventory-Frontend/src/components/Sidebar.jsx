import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import { GiAutoRepair } from "react-icons/gi";
import { PiDesktopTower } from "react-icons/pi";
import logo from "../assets/img/logoBioart.png";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import {FiUserPlus} from "react-icons/fi"

function Sidebar() {
  const { user } = useAuth();
  const [logUser, setLogUser] = useState({});
  const [home, setHome] = useState(true);
  const [userPage, setuserPage] = useState(false);
  const [eventsPage, setEventsPage] = useState(false);
  const [equipPage, setEquipPage] = useState(false);
  const [userCreatePage,setuserCreatePage] = useState(false)
  const [addPage, setAddPage] = useState(false);
  const history = useLocation();
  const [path,setPath]= useState(history.pathname);
  function changer(path) {
    switch (path) {
      case "/":
        setHome(true);
        setAddPage(false);
        setEquipPage(false);
        setEventsPage(false);
        setuserPage(false);
        setuserCreatePage(false);
        break;
      case "/userManagement":
        setHome(false);
        setAddPage(false);
        setEquipPage(false);
        setEventsPage(false);
        setuserPage(true);
        setuserCreatePage(false);

        break;
      case "/events":
        setHome(false);
        setAddPage(false);
        setEquipPage(false);
        setEventsPage(true);
        setuserPage(false);
        setuserCreatePage(false);

        break;
      case "/equipments":
        setHome(false);
        setAddPage(false);
        setEquipPage(true);
        setEventsPage(false);
        setuserPage(false);
        setuserCreatePage(false);

        break;
      case "/create":
        setHome(false);
        setAddPage(true);
        setEquipPage(false);
        setEventsPage(false);
        setuserPage(false);
        setuserCreatePage(false);

        break;
        case "/createUser":

        setHome(false);
        setAddPage(false);
        setEquipPage(false);
        setEventsPage(false);
        setuserPage(false);
        setuserCreatePage(true);
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    setLogUser(user);
  }, [user]);


  useEffect(() => {
    // Add a listener to respond to URL change
    const urlActual = history.pathname;
       setPath(urlActual)
    
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
              <h3 className="px-3 logoTitle mb-0">BIOART</h3>
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
                  path == "/" ? " SidebarLinks active" : " SidebarLinks"
                }
                
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
                      path == "/userManagement"
                        ? " SidebarLinks active"
                        : " SidebarLinks"
                    }
                    
                  >
                    <FaUsers size={"2rem"} />
                    <span className="tittles"> Usuarios</span>
                  </Link>
                </li>
                <li className="sidebarLi">
                  <Link
                    to="/createUser"
                    className={
                      path == "/createUser"
                        ? " SidebarLinks active"
                        : " SidebarLinks"
                    }
                    
                  >
                    <FiUserPlus size={"2rem"} />
                    <span className="tittles"> Crear usuario</span>
                  </Link>
                </li>
              </>
            ):""}

            <li className="sidebarLi">
              <Link
                to="/events"
                className={
                  path == "/events" ? " SidebarLinks active" : " SidebarLinks"
                }
                
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
                
              >
                <PiDesktopTower size={"2rem"} />
                <span className="tittles">Equipos</span>
              </Link>
            </li>
            <li className="sidebarLi">
              <Link
                to="/create"
                className={
                  path == "/create" ? " SidebarLinks active" : " SidebarLinks"
                }
                
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
