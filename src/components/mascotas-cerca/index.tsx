import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

//ui
import { Card } from "ui/card";
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

import { usePetAround, useCreateInformant } from "hooks/pet-hooks";

export function MascotasCercas() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [infoPet, setInfoPet] = useState(null);

  const userStorage = JSON.parse(sessionStorage.getItem("user"));
  const { setLangLong, results } = usePetAround();
  const { createInformant, response } = useCreateInformant();

  useEffect(() => {
    if (userStorage?.id && userStorage?.lat && userStorage?.long) {
      setLangLong({
        userId: userStorage.id,
        lat: userStorage.lat,
        long: userStorage.long,
      });
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLangLong({ lat: latitude, long: longitude });

            sessionStorage.setItem(
              "user",
              JSON.stringify({
                ...userStorage,
                lat: latitude,
                long: longitude,
              })
            );
          },
          (error) => {
            toast.error(error.message);
          }
        );
      } else {
        toast.error("Geolocation is not supported by this browser.");
      }
    }
  }, []);

  useEffect(() => {
    if (response && response.success) {
      toast.success(response.message, {
        autoClose: 3000,
      });
      setShowForm(false);
    }
  }, [response]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const sendDataReport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name").toString();
    const telefono = form.get("telefono").toString();
    const info = form.get("info").toString();

    createInformant({
      name,
      id: infoPet.id,
      phone: telefono,
      about: info,
    });
  };

  const handleClickReport = (id, name) => {
    if (!userStorage?.id) {
      toast.error(
        "Inicia sesión o regístrate para reportar esta mascota 🙏❤️",
        {
          autoClose: 1800,
          onClose: () => navigate("/"),
        }
      );
    } else {
      setShowForm(!showForm);
      setInfoPet({ id, name });
    }
  };

  return (
    <div className={style.mainContent}>
      <div>
        <div>
          {results?.data ? (
            results?.data.map((item) => (
              <div className={style.contentCard} key={item.objectID}>
                <Card
                  id={item.objectID}
                  imgSrc={item.imageUrl}
                  title={item.name}
                  description={item.ubication}
                  textButton="Informar sobre esta mascota"
                  color="rojo"
                  sendData={() => handleClickReport(item.objectID, item.name)}
                />
              </div>
            ))
          ) : (
            <div>
              <p>Aún no hay mascotas perdidas cerca de tu ubicación</p>
              <div>
                <img
                  src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1714510371/pet-finder/reports/btgol39wfj7mqzqsxzak.svg"
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`${style.contentReport} ${
          showForm ? style.reportOn : style.reportOff
        }`}
      >
        <div className={style.contentButton}>
          <button onClick={handleShowForm}>✖️</button>
        </div>
        <h3 className={style.titleReport}>Reportar Info de {infoPet?.name} </h3>
        <form onSubmit={sendDataReport} className={style.mainForm}>
          <div className={style.contentInput}>
            <label htmlFor="">NOMBRE</label>
            <MyInput type="text" name="name" color="negro" />
          </div>
          <div className={style.contentInput}>
            <label htmlFor="">TELEFONO</label>
            <MyInput type="text" name="telefono" color="negro" />
          </div>
          <div className={style.contentInput}>
            <label htmlFor="">¿DONDE LO VISTE?</label>
            <textarea className={style.myTextArea} name="info" id=""></textarea>
          </div>
          <div>
            <MyButton color="verde">Enviar Información</MyButton>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
