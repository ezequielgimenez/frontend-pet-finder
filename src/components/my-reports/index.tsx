import React, { useEffect, useState } from "react";
import * as style from "./index.module.css";

//ui
import { Card } from "ui/card";
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

//hook
import { useGetMyPets } from "hooks/pet-hooks";
import { queryState } from "lib/state-manager-pets";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export function MyReports() {
  const [showForm, setShowForm] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [results, setResults] = useState([]);
  const [userId, setUserId] = useRecoilState(queryState);
  const navigate = useNavigate();
  const userStorage = JSON.parse(sessionStorage.getItem("user"));

  const response = useGetMyPets();

  useEffect(() => {
    if (!userStorage) {
      navigate("/signin");
    } else if (!userStorage.id) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (userStorage) {
      setUserId(userStorage.id);
    }
  });

  useEffect(() => {
    if (response && response.success) {
      if (Array.isArray(response.data.myPets)) {
        setResults(response.data.myPets);
      } else {
        console.error("Expected an array but got", response.data);
      }
      setShowCard(true);
    }
  }, [response]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleCardClick = (id, namePet) => {
    setShowForm(!showForm);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // console.log(`Clicked Card with ID: ${id} and Title: ${namePet}`);
    const newObject = {
      id,
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
        </div>
      </div>
      <div className={`${showCard ? style.cardOn : style.cardOff}`}>
        {results.length > 0
          ? results.map((item) => (
              <div className={style.contentCard} key={item.id}>
                <Card
                  id={item.id}
                  imgSrc={item.petImageUrl}
                  title={item.namePet}
                  description={item.petUbicacion}
                  textButton="Editar"
                  color="azul"
                  sendData={handleCardClick}
                />
              </div>
            ))
          : null}
      </div>

      <div
        className={`${style.contentReport} ${
          showForm ? style.reportOn : style.reportOff
        }`}
      >
        <div className={style.contentButton}>
          <button onClick={handleShowForm}>✖️</button>
        </div>
        <h3 className={style.titleReport}>Reportar Info de </h3>
        <form className={style.mainForm}>
          <div className={style.contentInput}>
            <label htmlFor="">NOMBRE</label>
            <MyInput type="text" name="name" color="negro" />
          </div>
          <div className={style.contentInput}>
            <label htmlFor="">TELEFONO</label>
            <MyInput type="text" name="name" color="negro" />
          </div>
          <div className={style.contentInput}>
            <label htmlFor="">¿DONDE LO VISTE?</label>
            <textarea
              className={style.myTextArea}
              name="mascota"
              id=""
            ></textarea>
          </div>
          <div>
            <MyButton color="verde">Enviar Información</MyButton>
          </div>
        </form>
      </div>
    </div>
  );
}
