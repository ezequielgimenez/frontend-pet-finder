import React from "react";
import * as style from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { MyButton } from "ui/button/button";

export function ReportErrorPage() {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate("/report-pet");
  };

  return (
    <div>
      <div className={style.main}>
        <div className={style.title}>
          <h2>
            ❌😪 Se ha producido un error al crear o editar el reporte, por
            favor intentalo nuevamente y completa todos los campos para el
            reporte
          </h2>
        </div>
        <div>
          <MyButton onClick={handleRoute} color="azul">
            Volver
          </MyButton>
        </div>
      </div>
    </div>
  );
}
