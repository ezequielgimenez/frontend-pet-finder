import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useNavigate, useParams } from "react-router-dom";

import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

import { useResetPassword } from "hooks/auth-hooks";
import { toast, ToastContainer } from "react-toastify";

export function ChangePassword() {
  const navigate = useNavigate();
  const params = useParams();
  const { setTokenPassword, response } = useResetPassword();

  useEffect(() => {
    if (response) {
      if (response.success) {
        toast.success(response.message, {
          autoClose: 3000,
          onClose: () => {
            navigate("/signin");
            setTokenPassword({ token: "", password: "" });
          },
        });
      } else {
        toast.error(response.message, {
          autoClose: 3000,
        });
      }
    }
  }, [response]);

  const handleData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const password = form.get("password").toString();
    const passwordConfirm = form.get("confirmar").toString();

    if (!password || !passwordConfirm) {
      toast.error("No dejes campos sin completar");
    }
    if (password === passwordConfirm) {
      setTokenPassword({
        token: params.token,
        password,
      });
    }
  };
  return (
    <div>
      <div className={style.subContent}>
        <h1>Restablecer contraseña</h1>
      </div>
      <form className={style.form} onSubmit={handleData}>
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
        <ToastContainer />
      </form>
    </div>
  );
}
