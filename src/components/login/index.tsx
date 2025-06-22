import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import style from "./loginForm.module.css";
//ui
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

//hooks
import { useLogin, useAuthToken } from "hooks/auth-hooks";

export function LoginForm() {
  const navigate = useNavigate();
  const [emailPassword, setEmailPassword] = useState(null);
  const [token, setToken] = useState(null);

  const response = useLogin(emailPassword);
  const userAuth = useAuthToken(token);

  const userStorage = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (userStorage && userStorage.id) {
      navigate("/mis-datos");
    }
  }, []);

  useEffect(() => {
    if (response) {
      if (response.success) {
        setToken({ token: response.token });
        sessionStorage.setItem(
          "user",
          JSON.stringify({ token: response.token })
        );

        toast.success(response.message, {
          autoClose: 2000,
        });
      } else {
        toast.error(response.message, {
          autoClose: 2000,
        });
      }
    }
  }, [response]);

  useEffect(() => {
    if (userAuth) {
      if (userAuth.success) {
        const tokenStorage = JSON.parse(sessionStorage.getItem("user"));
        const dataUser = { ...tokenStorage, ...userAuth.data };
        sessionStorage.setItem("user", JSON.stringify(dataUser));
        toast.success(userAuth.message, {
          autoClose: 2000,
          onClose: () => navigate("/mis-datos"),
        });
      } else {
        toast.error(userAuth.message, {
          onClose: () => setEmailPassword({ email: "", password: "" }),
        });
      }
    }
  }, [userAuth]);

  const handleDataForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;

    const form = new FormData(e.currentTarget);
    const email = form.get("email").toString();
    const password = form.get("password").toString();

    if (!email || !password) {
      toast.error("Por favor, no dejes campos sin completar.");
      return;
    }
    setEmailPassword({ email, password });
    formElement.reset();
  };

  return (
    <div className={style.main}>
      <div className={style.subContent}>
        <img
          className={style.imgLogin}
          src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1720035417/Pet%20Finder%20React/Login%20Image/wlqpm8m5ihj2dnql5asz.svg"
          alt=""
        />
      </div>
      <div className={style.contentTitle}>
        <h1>Iniciar Sesión</h1>
        <p>Ingresá los siguientes datos para iniciar sesión</p>
      </div>
      <form className={style.mainForm} onSubmit={handleDataForm}>
        <div className={style.contentInput}>
          <label htmlFor="">EMAIL</label>
          <MyInput type="text" name="email"></MyInput>
        </div>
        <div className={style.contentInput}>
          <label htmlFor="">CONTRASEÑA</label>
          <MyInput type="password" name="password"></MyInput>
        </div>
        <div className={style.contentSesion}>
          <a href="/recovery-password">Olvide mi contraseña</a>
        </div>
        <div>
          <MyButton color="azul">Acceder</MyButton>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}
