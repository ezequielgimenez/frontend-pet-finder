import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// ui
import style from "./registerForm.module.css";
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

import { useSetAtom } from "jotai";
import { userDataAtom } from "lib/atom-auth-user";

export function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const setUserData = useSetAtom(userDataAtom);

  const userStorage = JSON.parse(sessionStorage.getItem("user"));
  if (userStorage && userStorage.id) {
    navigate("/mis-datos");
  }

  function handleDataForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget;

    const form = new FormData(e.currentTarget);
    const email = form.get("email").toString();
    const password = form.get("password").toString();
    const passwordConfirm = form.get("passwordConfirm");
    if (!password || !passwordConfirm || !email) {
      toast.error("No dejes campos sin completar");
    }
    if (password !== passwordConfirm) {
      toast.error("Las contraseñas no coinciden");
    } else {
      const data = { email, password };
      setUserData((prev) => ({
        ...prev,
        ...data,
      }));
      navigate("/signup/step-two");
    }
    formElement.reset();
  }

  function handleShowPass(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
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
          <MyInput
            type={showPassword ? "text" : "password"}
            name="password"
          ></MyInput>
        </div>
        <div className={style.contentInput}>
          <label htmlFor="">CONFIRMAR CONTRASEÑA</label>
          <MyInput
            type={showPassword ? "text" : "password"}
            name="passwordConfirm"
          ></MyInput>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            style={{ width: "15px", height: "20px" }}
            onChange={handleShowPass}
            type="checkbox"
          />
          <label style={{ paddingLeft: "15px" }}>Mostrar contraseña</label>
        </div>

        <div className={style.contentSesion}>
          <label htmlFor="">
            Ya tenes una cuenta? <a href="/signin">Inicia Sesión</a>{" "}
          </label>
        </div>
        <div className={style.containerButton}>
          <MyButton color="azul">Siguiente</MyButton>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}
