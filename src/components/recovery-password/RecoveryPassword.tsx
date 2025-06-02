import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import style from "./index.module.css";
import { MyButton } from "ui/button/button";

import { useRecoveryPassword } from "hooks/auth-hooks";

export function RecoveryPassword() {
  const { setEmail, result } = useRecoveryPassword();

  useEffect(() => {
    if (result) {
      if (result.success) {
        toast.success(result.message, {
          autoClose: 5000,
        });
      } else {
        toast.error(result.message, {
          autoClose: 2000,
        });
      }
    }
  }, [result]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(e.currentTarget);
    const email = form.get("email").toString();

    if (!email) {
      toast.error("No dejes el campo en blanco");
    }
    setEmail({
      email,
    });
    formEl.reset();
  };
  return (
    <form className={style.formMain} onSubmit={handleSubmit}>
      <h2>Cambiar Contraseña</h2>
      <label>Introduce tu email para cambiar tu contraseña</label>
      <div className={style.mainInput}>
        <input name="email" className={style.myInput} />
      </div>
      <MyButton color="azul">Enviar enlace de recuperacion</MyButton>
      <ToastContainer />
    </form>
  );
}
