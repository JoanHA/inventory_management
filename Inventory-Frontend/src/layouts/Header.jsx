import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";


function Header({ children }) {
  const { isAuthenticated, logOut } = useAuth();
  function click(){
    document.getElementById("sidebar").classList.toggle("Clicked");
    document.getElementById("sidebarContainer").classList.toggle("Clicked2");
  }


  return (
    <>
      <div className="d-flex flex-row">
        <Sidebar></Sidebar>
        <div id="headerContainer" className="w-100 h-100">
          <nav className="navbar bg-body-tertiary" id="navbar00">
            <button  className={isAuthenticated? "menu-icon": "menu-icon d-none"} onClick={click}>
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="d-flex flex-row flex-wrap px-2 mx-2">
              <a className="navbar-brand  " href="/">
                Inventario Bioart
              </a>

              <div className=" " id="">
                <ul className="navbar-nav">
                  {isAuthenticated ? (
                    <>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          type="button"
                          onClick={logOut}
                        >
                          {" "}
                          Cerrar Sesion
                        </button>
                      </li>
                    </>
                  ) : (
                    <li className="nav-item">
                      <a className="nav-link" href="/login">
                        Iniciar de sesión
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
          <div id="Contenedor" className="w-100 ">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
