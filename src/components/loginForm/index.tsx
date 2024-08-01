import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as style from "./loginForm.module.css";
//ui
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

//recoil && state manager
import { useRecoilState } from "recoil";
import { userDataState } from "lib/state-manager-user"; //state main
//hooks
import { useAuthToken } from "hooks/auth-hooks";
import { useLogin } from "hooks/auth-hooks";

export function LoginForm() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userDataState);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const responseToken = useAuthToken(user);
  const response = useLogin(user);

  const updateStorage = JSON.parse(sessionStorage.getItem("user"));

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });

  useEffect(() => {
    if (responseToken) {
      if (responseToken.success) {
        setMessage(responseToken.message + " redigiriendo..");

        const token = responseToken.data.token;
        if (user.token !== token) {
          setUser((prevUser) => {
            const newState = {
              ...prevUser,
              token,
            };
            return newState;
          });
        }
      } else {
        setMessageError(responseToken.message);
      }
    }
  }, [responseToken, user.token]);

  useEffect(() => {
    if (response) {
      if (response.success) {
        const data = response.data.user;
        sessionStorage.setItem("user", JSON.stringify(data));
        setTimeout(() => {
          navigate(`/mis-reportes`);
        }, 4000);
      }
    }
  }, [response]);

  const handleDataForm = async (e) => {
    setMessage("");
    setMessageError("");
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      alert("Por favor, no dejes campos sin completar.");
      return;
    }

    setUser(() => {
      const newState = {
        ...user,
        email,
        password,
      };
      return newState;
    });
    e.target.reset();
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
        <div className={style.messageOk}>{message}</div>
        <div className={style.messageError}>{messageError}</div>

        <div className={style.contentSesion}>
          <a href="/recovery-password">Olvide mi contraseña</a>
        </div>
        <div>
          <MyButton color="azul">Acceder</MyButton>
        </div>
      </form>
    </div>
  );
}
