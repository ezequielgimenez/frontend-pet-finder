import React from "react";
import * as style from "./index.module.css";
import { useNavigate } from "react-router-dom";

import { MyButton } from "ui/button/button";

import { useRegister } from "hooks/auth-hooks";
import { userDataState } from "lib/state-manager-user";
import { useRecoilState } from "recoil";

export function MisDatos() {
  let user;
  const navigate = useNavigate();
  const dataUser = sessionStorage.getItem("user");

  try {
    user = dataUser ? JSON.parse(dataUser) : {};
  } catch (error) {
    user = {};
  }
  const [userD, setDataUser] = useRecoilState(userDataState);

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
            <label htmlFor="email">{user.email}</label>
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
