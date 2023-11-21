import  { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import people from "../assets/img/PeopleLogo.jpg";
import { MdAddToQueue } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { AiOutlineFundView } from "react-icons/ai";
function Welcome() {
  const { user } = useAuth();
  const [pageSize, setPageSize] = useState(window.innerWidth);
  const [display,setDisplay] = useState("none")
  window.onresize = () => {
    setPageSize(window.innerWidth);
  };
  
  useEffect(() => {
    if (window.innerWidth < 906) {
     setDisplay("d-none")
    } else {
      setDisplay("d-block")
    }
  }, [pageSize]);
  return (
    <div className=" my-1 w-100">
      <div className="mx-auto   text-center">
        <div className="event_header">
          <h3>Bienvenido al sistema de inventarios de Bioart SA</h3>
        </div>

        <div className="mt-4 ">
          <h4 className="">Bienvenido Usuario: {user.username}</h4>
          <h5>Rol: {user.rolName}</h5>
          <h6>{user.email}</h6>
        </div>
        <div className="d-flex flex-row mx-4  align-items-center  justify-content-evenly ">
          <div className="d-flex flex-column flex-wrap align-items-center justify-content-center gap-4 mt-5">
          <Link className="GoLink" to={"/userManagement"}>
              <div
                className="card d-flex flex-row text-dark bg-light mb-3 py-2 align-items-center rounded justify-content-evenly "
                style={{
                  maxWidth: " 24rem",
                  width: "23rem",
                  boxShadow: "0px 1px 7px gray",
                }}
              >
                <FaUsersGear size={30} />
                <div className=" ">
                  <h5 className="my-0 text-center">
                    {" "}
                    <span className="mx-1">Administrar usuarios</span>
                  </h5>
                </div>

                <div className=" cardFoot py-0">
                  <span className="arrow">
                    <FaArrowRight fill="black" />
                  </span>
                </div>
              </div>
            </Link>
           <Link className="GoLink" to={"/create"}>
              <div
                className="card d-flex flex-row text-dark bg-light mb-3 py-2 align-items-center rounded justify-content-evenly "
                style={{
                  maxWidth: " 24rem",
                  width: "23rem",
                  boxShadow: "0px 1px 7px gray",
                }}
              >
                <MdAddToQueue size={30} />
                <div className=" ">
                  <h5 className="my-0 text-center">
                    {" "}
                    <span className="mx-1">Registrar equipos</span>
                  </h5>
                </div>

                <div className=" cardFoot py-0">
                  <span className="arrow">
                    <FaArrowRight fill="black" />
                  </span>
                </div>
              </div>
            </Link>
           
             <Link className="GoLink" to={"/events"}>
              <div
                className="card d-flex flex-row text-dark bg-light mb-3 py-2 align-items-center rounded justify-content-evenly "
                style={{
                  maxWidth: " 24rem",
                  width: "23rem",
                  boxShadow: "0px 1px 7px gray",
                }}
              >
                <AiOutlineFundView size={35} />
                <div className=" ">
                  <h5 className="my-0 text-center">
                    {" "}
                    <span className="mx-1">Ver eventos</span>
                  </h5>
                </div>

                <div className=" cardFoot py-0">
                  <span className="arrow">
                    <FaArrowRight fill="black" />
                  </span>
                </div>
              </div>
            </Link>
           
          </div>
          <div>
            {" "}
            <img src={people} alt="Image in the welcome page" className={`${display}`} width={350} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
