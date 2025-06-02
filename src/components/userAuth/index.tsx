import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";
import style from "./userAuth.module.css";

//ui
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

//custom hooks
import { useEmail } from "hooks/auth-email";

export function UserAuth() {
  const navigate = useNavigate();
  const { setEmail, result } = useEmail();
  const userStorage = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (userStorage && userStorage?.id) {
      navigate("/mis-datos");
    }
  }, []);

  useEffect(() => {
    if (result) {
      if (result.success) {
        toast.success(result.message, {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        toast.error(result.message);
      }
    }
  }, [result]);

  const handleFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email").toString();
    setEmail({ email });
  };

  return (
    <div>
      <div>
        <div className={style.subContent}>
          <img
            className={style.imgAuth}
            src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1720035343/Pet%20Finder%20React/Auth%20Image/erxteohhhszc608vfqgc.svg"
            alt=""
          />
        </div>
        <div className={style.subContent}>
          <h1>Ingresar</h1>
          <p>Ingresá tu email para continuar.</p>
        </div>
        <form className={style.form} onSubmit={handleFormData}>
          <div className={style.contentInput}>
            <label htmlFor="">EMAIL</label>
            <MyInput type="text" name="email"></MyInput>
          </div>
          <div>
            <MyButton type="submit" color="azul">
              Siguiente
            </MyButton>
          </div>
        </form>
        <div className={style.contentSesion}>
          <label htmlFor="">
            Aún no tenes cuenta? <a href="/signup">Registrate.</a>
          </label>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
