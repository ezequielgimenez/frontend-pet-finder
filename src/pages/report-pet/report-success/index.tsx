import React from "react";
import * as style from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { MyButton } from "ui/button/button";

export function ReportSuccessPage() {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate("/mis-reportes");
  };
  return (
    <div>
      <div className={style.main}>
        <div className={style.title}>
          <h2>✅ Reporte creado correctamente</h2>
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
