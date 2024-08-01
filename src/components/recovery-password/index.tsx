import React, { useEffect, useState } from "react";

import * as style from "./index.module.css";
import { MyButton } from "ui/button/button";
import { useRecoilState } from "recoil";

//state manager email
import { emailAtom } from "lib/state-auth-email";
//custom hook
import { useForgotPassword } from "hooks/auth-email";

export function RecoveryPassword() {
  const [myEmail, setEmail] = useRecoilState(emailAtom);
  const response = useForgotPassword(myEmail);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    if (response) {
      if (response.success) {
        setMessage(response.message);
      } else {
        setMessageError(response.error);
      }
    }
  }, [response]);

  const handleSubmit = async (e) => {
    setMessage("");
    setMessageError("");
    e.preventDefault();
    const emailValue = e.target.email.value;
    setEmail({ email: emailValue });
  };
  return (
    <form className={style.formMain} onSubmit={handleSubmit}>
      <h2>Cambiar Contraseña</h2>
      <label>Introduce tu email para cambiar tu contraseña</label>
      <div className={style.mainInput}>
        <input name="email" className={style.myInput} />
      </div>
      <div className={style.green}>{message}</div>
      <div className={style.red}>{messageError}</div>
      <MyButton color="azul">Enviar enlace de recuperacion</MyButton>
    </form>
  );
}

export default RecoveryPassword;
