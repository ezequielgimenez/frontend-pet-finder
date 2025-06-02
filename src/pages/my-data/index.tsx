import React from "react";
import * as style from "./index.module.css";
import { useNavigate } from "react-router-dom";

import { MyButton } from "ui/button/button";

export function MisDatos() {
  const navigate = useNavigate();

  const userStorage = JSON.parse(sessionStorage.getItem("user"));

  const handleCerrarSesion = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleEditData = (e) => {
    e.preventDefault();

    navigate("/edit-data");
  };

  const handleEditPassword = (e) => {
    e.preventDefault();

    navigate("/edit-password");
  };

  return (
    <div>
      <div className={style.subContent}>
        <h1>Mis datos</h1>
      </div>
      <form className={style.form}>
        <div className={style.contentInput}>
          <MyButton onClick={handleEditData} color="azul">
            Actualiza tus datos
          </MyButton>
        </div>
        <div className={style.contentInput}>
          <MyButton onClick={handleEditPassword} color="azul">
            Modificar Contraseña
          </MyButton>
        </div>
        <div className={style.sesion}>
          <div>
            <label htmlFor="email">
              {userStorage?.email ? userStorage.email : ""}
            </label>
          </div>
          <div>
            <a onClick={handleCerrarSesion} href="">
              Cerrar Sesión
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
