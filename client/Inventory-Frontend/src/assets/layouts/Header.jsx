import React from 'react'

function Header() {
  return (
    <div><nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Inventario Bioart</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
         
          <li className="nav-item">
            <a className="nav-link" href="/events">Eventos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="login">Inicio de sesión</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Equipos
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="/create">Registrar Equipo</a></li>
              <li><a className="dropdown-item" href="/equipments">Ver equipos</a></li>
              <li><a className="dropdown-item" href="/create_event">Registrar eventos</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav></div>
  )
}

export default Header