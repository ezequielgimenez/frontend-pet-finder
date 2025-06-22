import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import style from "./index.module.css";

//ui
import { Card } from "ui/card";
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

//hook
import { useGetMyPets } from "hooks/pet-hooks";

export function MyReports() {
  const navigate = useNavigate();

  const [showCard, setShowCard] = useState(false);
  const [results, setResults] = useState([]);
  const [userId, setUserId] = useState(null);
  const userStorage = JSON.parse(sessionStorage.getItem("user"));

  const response = useGetMyPets(userId);

  useEffect(() => {
    if (userStorage && userStorage.id) {
      setUserId({
        userId: userStorage.id,
      });
    }
  }, []);

  useEffect(() => {
    if (response) {
      if (response.success) {
        setShowCard(!showCard);
        setResults(response.data);
      } else {
        toast.error(response.message);
      }
    }
  }, [response]);

  const handleCardClick = (id, name) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const newObject = {
      id,
      name,
    };
    sessionStorage.setItem("pet", JSON.stringify(newObject));
    navigate("/edit-report");
  };

  return (
    <div className={style.mainContent}>
      <h1>Mis reportes</h1>
      <div className={`${showCard ? style.cardOff : style.cardOn}`}>
        <div className={style.containerText}>
          <div>
            <p>Aún no reportaste mascotas perdidas</p>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1714510371/pet-finder/reports/btgol39wfj7mqzqsxzak.svg"
              alt=""
            />
          </div>
          <div style={{ margin: "25px 0" }}>
            <MyButton color="azul" onClick={() => navigate("/report-pet")}>
              Crear un reporte de mascota
            </MyButton>
          </div>
        </div>
      </div>
      <div className={`${showCard ? style.cardOn : style.cardOff}`}>
        {results
          ? results.map((item) => (
              <div className={style.contentCard} key={item.id}>
                <Card
                  id={item.id}
                  imgSrc={item.imageUrl}
                  title={item.name}
                  description={item.ubication}
                  textButton="Editar"
                  color="azul"
                  sendData={() => {
                    handleCardClick(item.id, item.name);
                  }}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
