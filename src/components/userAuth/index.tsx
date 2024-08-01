import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as style from "./userAuth.module.css";
import { useRecoilState } from "recoil";

//ui
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

//state manager email
import { emailAtom } from "lib/state-auth-email";
//hooks
import { useEmail } from "hooks/auth-email";

export function UserAuth() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const MAPBOX_TOKEN = import.meta.env.VITE_TOKEN_MAPBOX;

  const navigate = useNavigate();
  const [myEmail, setEmail] = useRecoilState(emailAtom);
  const [messageOk, setMessageOk] = useState("");
  const [messageError, setMessageError] = useState("");

  const emailResult = useEmail(myEmail);
  const storage = JSON.parse(sessionStorage.getItem("user"));

  console.log("api", API_BASE_URL);
  console.log("api mapbox", MAPBOX_TOKEN);

  useEffect(() => {
    if (storage && storage.id) {
      navigate("/mis-datos");
    }
  }, []);

  useEffect(() => {
    if (emailResult) {
      if (emailResult.success) {
        setMessageOk(emailResult.message);
        setTimeout(() => {
          navigate("/signIn");
        }, 3000);
      } else {
        setMessageError(emailResult.message);
      }
    }
  }, [emailResult]);

  function handleFormData(e) {
    e.preventDefault();
    const emailValue = e.target.email.value;

    setEmail({ email: emailValue });
  }

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
            <MyButton color="azul">Siguiente</MyButton>
          </div>
        </form>
        <div className={style.messageOk}>{messageOk}</div>
        <div className={style.messageError}>{messageError}</div>
        <div className={style.contentSesion}>
          <label htmlFor="">
            Aún no tenes cuenta? <a href="/signUp">Registrate.</a>
          </label>
        </div>
      </div>
    </div>
  );
}
