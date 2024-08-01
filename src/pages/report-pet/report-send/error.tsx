import React from "react";
import * as style from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { MyButton } from "ui/button/button";

export function ReportSendErrorPage() {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate("/mis-reportes");
  };
  return (
    <div>
      <div className={style.main}>
        <div className={style.title}>
          <h2>
            ❌😪 Ocurrió un problema al enviar la información, por favor
            inténtalo nuevamente{" "}
          </h2>
        </div>
        <div>
          <MyButton onClick={handleRoute} color="azul">
            Ir a mis reportes
          </MyButton>
        </div>
      </div>
    </div>
  );
}
