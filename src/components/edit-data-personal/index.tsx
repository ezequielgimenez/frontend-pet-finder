import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

//ui
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

import { setLongLat } from "lib/data-fetchs";
import { useUpdateUser } from "hooks/auth-hooks";

export function EditData() {
  const navigate = useNavigate();
  const { setUpdate, result } = useUpdateUser();

  const userStorage = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!userStorage?.token) {
      navigate("/signin");
    }
  }, []);

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const form = new FormData(e.currentTarget);
    const fullName = form.get("name").toString();
    const localidad = form.get("localidad").toString();

    if (!fullName || !localidad) {
      toast.error("Por favor no dejes campos sin completar");
      return;
    }
    // Obtengo la latitud y longitud
    const result = await setLongLat(localidad);

    setUpdate({
      fullName,
      localidad,
      lat: result.lat,
      long: result.long,
    });
    formElement.reset();
  };

  useEffect(() => {
    if (result) {
      if (result.success) {
        toast.success(result.message);
        const storage = JSON.parse(sessionStorage.getItem("user"));
        const joinData = { ...storage, ...result.data };
        sessionStorage.setItem("user", JSON.stringify(joinData));
      } else {
        toast.error(result.message);
      }
    }
  }, [result]);

  return (
    <div>
      <div className={style.subContent}>
        <h1>Datos Personales</h1>
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
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}
