/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { FaUserCircle, FaUsers,FaRegUser  } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import { GiAutoRepair } from "react-icons/gi";
import { PiDesktopTower, PiUserCirclePlusLight   } from "react-icons/pi";
import logo from "../assets/img/logoBioart.png";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { BiSolidUserDetail } from "react-icons/bi";
import { TbUsersPlus } from "react-icons/tb";
function Sidebar() {
  const { user } = useAuth();
  const [logUser, setLogUser] = useState({}); 
  const history = useLocation();
  const [path,setPath]= useState(history.pathname);

  useEffect(() => {
    setLogUser(user);
    if (user) {
      document.getElementById("sidebarContainer").classList.remove("d-none")
    } 

  }, [user]);


  useEffect(() => {
    // Add a listener to respond to URL change
    const urlActual = history.pathname;
       setPath(urlActual)
      //  if (urlActual != "/login" && urlActual != "/register" && urlActual != "/otp" && urlActual != "/reset" && urlActual != "/enterEmail") {
      //   document.getElementById("sidebarContainer").classList.remove("d-none")
      // }
  }, [history]);

  
  return (
  
  <div id="sidebarContainer"  className="d-none  " >
      <div id="sidebar" className="h-100  vh-100  position-fixed z-3">
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
            <FaRegUser  size={"2rem"} className="" />
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
             
               
              </>
            ):""}
            {
              user && user.rol != 272 ? (  <li className="sidebarLi">
              <Link
                to="/createWorker"
                className={
                  path == "/createWorker"
                    ? " SidebarLinks active"
                    : " SidebarLinks"
                }
                
              >
                <TbUsersPlus  size={"2rem"} />
                <span className="tittles"> Crear Colaborador</span>
              </Link>
            </li>):""
            }
          
             <li>
              <Link to={"/Workers"}
                className={
                  path == "/Workers" ? " SidebarLinks active" : " SidebarLinks"
                }
              >
                <BiSolidUserDetail   size={"2rem"} fill="#fff"/>
                <span className="tittles">Colaboradores</span>


              </Link>
            </li>

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
                  path == "/equipments" ? " SidebarLinks active" : " SidebarLinks"
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
            {/* <li className="sidebarLi">
              <Link
                to="/cellphones"
                className={
                  path == "/cellphones" ? " SidebarLinks active" : " SidebarLinks"
                }
                
              >
                <HiOutlineDevicePhoneMobile   size={"2rem"} />
                <span className="tittles">Celulares</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>


    
  
  );
}

export default Sidebar;
