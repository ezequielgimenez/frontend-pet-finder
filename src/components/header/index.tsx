import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import * as style from "./header.module.css";
import { HeaderForFullWindows } from "./headerDesktop";

export function MyHeader() {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const handleShow = () => {
    setShowNav(!showNav);
  };

  const handleCerrarSesion = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const storageUser = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div>
      <header className={style.header}>
        <div className={style.containerLogo}>
          <a href="/">
            <img
              className={style.imgHeader}
              src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1748989722/PetFinder-2025/Logo%20pet%20finder%20mobile/logo-pet-finder-mobile_icnjqk.png"
              alt="Logo de Pet Finder"
            />
            <span style={{ display: "none" }}>
              Volver a la página principal
            </span>
          </a>
        </div>

        <div
          className={`${style.containerLinks} ${
            showNav ? style.open : style.closed
          }`}
        >
          <button className={style.closeButton} onClick={handleShow}>
            ✖️
          </button>
          {storageUser && storageUser.id && storageUser.localidad ? (
            <div className={style.contenedorNav}>
              <a className={style.referencia} href="/mis-datos">
                Mis Datos
              </a>
              <a className={style.referencia} href="/mis-reportes">
                Mis mascotas reportadas
              </a>
              <a className={style.referencia} href="/report-pet">
                Crear reporte
              </a>
              <a className={style.referencia} href="/mascotas-cerca">
                Mascotas perdidas cerca
              </a>
              <div className={style.cerrarSesion}>
                <a href=""></a>
                <a onClick={handleCerrarSesion} href="">
                  Cerrar Sesión
                </a>
              </div>
            </div>
          ) : (
            <div className={style.divRegister}>
              <a className={style.referencia} href="/signup">
                Registrarse
              </a>
              <a className={style.referencia} href="/signin">
                Iniciar Sesion
              </a>
            </div>
          )}
        </div>
        <HeaderForFullWindows />

        <div className={style.containerImg} onClick={handleShow}>
          <img
            style={{ height: "40px" }}
            src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1748990406/PetFinder-2025/Logo%20pet%20finder%20mobile/burger-bar_xd0jz1.png"
          />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
