import React, { useEffect, useState } from "react";
import * as style from "./index.module.css";
import { useRecoilState } from "recoil";

import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

// state && hooks
import { userDataState } from "lib/state-manager-user";
import { useUpdatePassword } from "hooks/auth-hooks";
import { useNavigate } from "react-router-dom";

export function EditPassword() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const userStorage = JSON.parse(sessionStorage.getItem("user"));

  // hooks
  const [user, setUser] = useRecoilState(userDataState);
  const response = useUpdatePassword(user);

  useEffect(() => {
    if (!userStorage) {
      navigate("/signin");
    } else if (!userStorage.id) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (response) {
      if (response.success) {
        setMessage(response.message);
      } else {
        setMessageError(response.message);
      }
    }
  }, [response]);

  const handleFormData = (e) => {
    setMessage("");
    setMessageError("");
    e.preventDefault();
    const passwordActual = e.target.actual.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmar.value;

    if (!password || !confirmPassword || !passwordActual) {
      alert("Por favor, no dejes campos sin completar.");
      return;
    }
    if (password === confirmPassword) {
      setUser((prevData) => {
        const newState = {
          ...prevData,
          userId: userStorage && userStorage.id ? userStorage.id : "",
          password,
          passwordActual,
        };
        return newState;
      });
    }
    e.target.reset();
  };
  return (
    <div>
      <div className={style.subContent}>
        <h1>Contraseña</h1>
      </div>
      <form className={style.form} onSubmit={handleFormData}>
        <div className={style.contentInput}>
          <label htmlFor="">CONTRASEÑA ACTUAL</label>
          <MyInput type="password" name="actual"></MyInput>
        </div>
        <div className={style.contentInput}>
          <label htmlFor="">NUEVA CONTRASEÑA</label>
          <MyInput type="password" name="password"></MyInput>
        </div>
        <div className={style.contentInput}>
          <label htmlFor="">CONFIRMAR CONTRASEÑA</label>
          <MyInput type="password" name="confirmar"></MyInput>
        </div>
        <div>
          <MyButton color="azul">Guardar</MyButton>
        </div>
        <div className={style.message}>{message}</div>
        <div className={style.messageError}>{messageError}</div>
      </form>
    </div>
  );
}
