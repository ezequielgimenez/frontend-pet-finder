import React, { useEffect, useState } from "react";
import * as style from "./index.module.css";
import { useRecoilState } from "recoil";

import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

// state && hooks
import { tokenState } from "lib/state-auth-email";
import { useChangePassword } from "hooks/auth-email";

import { useNavigate } from "react-router-dom";

export function ChangePassword() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [myData, setMyData] = useRecoilState(tokenState);
  const response = useChangePassword(myData);

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
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmar.value;

    if (!password || !confirmPassword) {
      alert("Por favor, no dejes campos sin completar.");
      return;
    }
    if (password === confirmPassword) {
      setMyData((prevData) => {
        const newState = {
          ...prevData,
          password,
        };
        return newState;
      });
    } else {
      alert("Las contraseñas no coinciden.");
    }
    e.target.reset();
  };

  return (
    <div>
      <div className={style.subContent}>
        <h1>Restablecer contraseña</h1>
      </div>
      <form className={style.form} onSubmit={handleFormData}>
        <div className={style.contentInput}>
          <label htmlFor="">NUEVA CONTRASEÑA</label>
          <MyInput type="password" name="password"></MyInput>
        </div>
        <div className={style.contentInput}>
          <label htmlFor="">CONFIRMAR CONTRASEÑA</label>
          <MyInput type="password" name="confirmar"></MyInput>
        </div>
        <div className={style.message}>{message}</div>
        <div className={style.messageError}>{messageError}</div>
        <div>
          <MyButton color="azul">Guardar</MyButton>
        </div>
      </form>
    </div>
  );
}
