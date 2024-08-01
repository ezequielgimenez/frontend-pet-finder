import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as style from "./registerForm.module.css";
// ui
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

import { useRegister } from "hooks/auth-hooks";

import { userDataState } from "lib/state-manager-user";
import { useRecoilState } from "recoil";

export function RegisterForm() {
  const navigate = useNavigate();

  const [errorInput, setErrorInput] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setDataUser] = useRecoilState(userDataState);

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });

  //custom hook
  const respuesta = useRegister(user);

  useEffect(() => {
    if (respuesta) {
      if (respuesta.success) {
        setSuccessMessage(respuesta.message);
        setErrorEmail("");

        sessionStorage.setItem("user", JSON.stringify(respuesta.data.user));

        setTimeout(() => {
          navigate("/signup/step-two");
        }, 2000);
      } else {
        setErrorEmail(respuesta.message);
        setSuccessMessage("");
      }
    }
  }, [respuesta]);

  function handleDataForm(e) {
    setErrorInput("");
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;

    if (!password || !passwordConfirm || !email) {
      setErrorInput("Hay campos sin completar");
    } else if (password !== passwordConfirm) {
      setErrorInput("Las contraseñas no coinciden");
    } else {
      setDataUser(() => {
        const newState = {
          ...user,
          email,
          password,
        };

        return newState;
      });
    }
    e.target.reset();
  }

  return (
    <div>
      <div className={style.subContent}>
        <img
          className={style.imgRegister}
          src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1720035447/Pet%20Finder%20React/SignUp%20Image/agxb2q3j2mv0oldx4lib.svg"
          alt=""
        />
      </div>
      <div className={style.contentTitle}>
        <h1>Registrarse 1/2</h1>
        <p>Ingresá los siguientes datos para realizar el registro</p>
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
        <div className={style.contentInput}>
          <label htmlFor="">CONFIRMAR CONTRASEÑA</label>
          <MyInput type="password" name="passwordConfirm"></MyInput>
        </div>
        <p className={style.error}>{errorInput}</p>
        <p className={style.error}>{errorEmail}</p>
        <p className={style.success}>{successMessage}</p>
        <div className={style.contentSesion}>
          <label htmlFor="">
            Ya tenes una cuenta? <a href="/signIn">Inicia Sesión</a>{" "}
          </label>
        </div>
        <div className={style.containerButton}>
          <MyButton color="azul">Siguiente</MyButton>
        </div>
      </form>
    </div>
  );
}
