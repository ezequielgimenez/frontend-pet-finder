import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

//ui
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

import { useRegister } from "hooks/auth-hooks";
//fetch long lat
import { setLongLat } from "lib/data-fetchs";

export function RegisterForm2() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const response = useRegister(userData);

  const userStorage = JSON.parse(sessionStorage.getItem("user"));
  if (userStorage && userStorage.id) {
    navigate("/mis-datos");
  }

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;

    const form = new FormData(e.currentTarget);
    const fullName = form.get("name").toString();
    const localidad = form.get("localidad").toString();

    if (!fullName || !localidad) {
      toast.error("Por favor, no dejes campos sin completar.");
      return;
    }
    // obtengo latitud y longitud
    const { lat, long } = await setLongLat(localidad);
    if (lat && long) {
      const dataProvisoria = JSON.parse(sessionStorage.getItem("registro"));
      setUserData({
        ...dataProvisoria,
        fullName,
        localidad,
        lat,
        long,
      });
    }
    formElement.reset();
  };

  useEffect(() => {
    if (response) {
      if (response.success) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        toast.success(response.message, {
          autoClose: 2000,
          onClose: () => navigate("/mascotas-cerca"),
        });
      } else {
        toast.error(response.message, {
          autoClose: 2000,
          onClose: () => navigate("/signup"),
        });
      }
    }
  }, [response]);

  return (
    <div>
      <div className={style.subContent}>
        <h1>Registrarse 2/2</h1>
        <p>Ingresá los siguientes datos para realizar el registro</p>
      </div>
      <form className={style.form} onSubmit={handleFormData}>
        <div className={style.contentInput}>
          <label htmlFor="">NOMBRE</label>
          <MyInput type="text" name="name"></MyInput>
        </div>
        <div className={style.contentInput}>
          <label htmlFor="">LOCALIDAD</label>
          <MyInput type="text" name="localidad"></MyInput>
        </div>
        <div>
          <MyButton color="azul">Guardar</MyButton>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}
