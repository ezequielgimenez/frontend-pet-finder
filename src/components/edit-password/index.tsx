import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { toast, ToastContainer } from "react-toastify";

import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

import { useNavigate } from "react-router-dom";
import { useUpdatePassword } from "hooks/auth-hooks";

export function EditPassword() {
  const navigate = useNavigate();
  const userStorage = JSON.parse(sessionStorage.getItem("user"));
  const { setUpdate, result } = useUpdatePassword();

  useEffect(() => {
    if (!userStorage?.id) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (result) {
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  }, [result]);

  const handleFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(e.currentTarget);
    const passwordActual = form.get("actual").toString();
    const password = form.get("password").toString();
    const confirmPassword = form.get("confirmar").toString();

    if (!password || !confirmPassword || !passwordActual) {
      toast.error("Por favor no dejes campos sin completar");
      return;
    }
    if (password === confirmPassword) {
      setUpdate({
        password: passwordActual,
        passwordNueva: confirmPassword,
      });
    }
    formElement.reset();
  };
  return (
    <div>
      <div className={style.subContent}>
        <h1>Contraseña</h1>
      </div>
      <form className={style.form} onSubmit={handleFormData}>
        <div className={style.contentInput}>
          <label htmlFor="">CONTRASEÑA ACTUAL</label>
          <MyInput type="password" name="actual" onShowButton={true}></MyInput>
        </div>
        <div className={style.contentInput}>
          <label htmlFor="">NUEVA CONTRASEÑA</label>
          <MyInput
            type="password"
            name="password"
            onShowButton={true}
          ></MyInput>
        </div>
        <div className={style.contentInput}>
          <label htmlFor="">CONFIRMAR CONTRASEÑA</label>
          <MyInput
            type="password"
            name="confirmar"
            onShowButton={true}
          ></MyInput>
        </div>
        <div>
          <MyButton color="azul">Guardar</MyButton>
        </div>

        <ToastContainer />
      </form>
    </div>
  );
}
