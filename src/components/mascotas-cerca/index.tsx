import React, { useEffect, useState } from "react";
import * as style from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

//ui
import { Card } from "ui/card";
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

// states
import { userDataState } from "lib/state-manager-user";
import { userDataReport } from "lib/state-manager-user-report";
import { getEmailReport } from "lib/state-manager-user-report";
import { useMascotasCercas } from "hooks/auth-hooks";

//hooks info report
import { useReportPet } from "hooks/reports-hooks";
import { useSendInfoReport } from "hooks/reports-hooks";
import { useGetEmail } from "hooks/reports-hooks";

export function MascotasCercas() {
  const navigate = useNavigate();
  //user storage
  const storage = JSON.parse(sessionStorage.getItem("user"));

  //states manager
  const [user, setUser] = useRecoilState(userDataState);
  const [reportData, setReportData] = useRecoilState(userDataReport);
  const [id, setId] = useRecoilState(getEmailReport);

  // resultados de custom hooks
  const responseEmail = useGetEmail(id);
  const petReport = useReportPet(reportData);
  const sendInfo = useSendInfoReport(reportData);

  //states of components
  const [showForm, setShowForm] = useState(false);
  const results = useMascotasCercas(user);
  const [mascotas, setMascotas] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [namePet, setNamePet] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!storage) {
      navigate("/signin");
    } else if (!storage.id) {
      navigate("/signin");
    } else if (!storage.lat || !storage.long) {
      navigate("/mis-datos");
    }
  }, []);

  useEffect(() => {
    if (responseEmail) {
      if (responseEmail.success) {
        const email = responseEmail.data.email;
        setEmail(email);
      }
    }
  }, [responseEmail]);

  useEffect(() => {
    const storage = JSON.parse(sessionStorage.getItem("user"));
    if (storage && storage.lat && storage.long) {
      setUser((prevUser) => ({
        ...prevUser,
        lat: storage.lat,
        long: storage.long,
      }));
    }
  }, []);

  useEffect(() => {
    if (results) {
      if (results.success) {
        setMascotas(results.data);
        setShowCard(true);
      }
    }
  }, [results]);

  useEffect(() => {
    if (petReport && sendInfo) {
      if (petReport.success && sendInfo.success) {
        navigate("/send-success");
      } else {
        navigate("/send-error");
      }
    }
  }, [petReport, sendInfo]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleCardClick = (id, namePet) => {
    setShowForm(!showForm);
    setNamePet(namePet);
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log(`Clicked Card with ID: ${id} and Title: ${namePet}`);
    setId({
      idPet: id,
    });
  };

  const sendDataReport = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const telefono = e.target.telefono.value;
    const info = e.target.info.value;

    setReportData((prevData) => {
      const newState = {
        ...prevData,
        reportName: name,
        phoneNumber: telefono,
        moreAbout: info,
        email,
        idPet: Number(id.idPet),
      };
      console.log("Setie la data:", newState);
      return newState;
    });
    setShowForm(false);
  };

  return (
    <div className={style.mainContent}>
      <h1>Mascotas perdidas cerca</h1>
      <div className={`${showCard ? style.cardOn : style.cardOff}`}>
        {mascotas && mascotas.length > 0 ? (
          mascotas.map((item) => (
            <div className={style.contentCard} key={item.objectID}>
              <Card
                id={item.objectID}
                imgSrc={item.petImageUrl}
                title={item.namePet}
                description={item.petUbicacion}
                textButton="Reportar"
                color="rojo"
                sendData={handleCardClick}
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

      <div
        className={`${style.contentReport} ${
          showForm ? style.reportOn : style.reportOff
        }`}
      >
        <div className={style.contentButton}>
          <button onClick={handleShowForm}>✖️</button>
        </div>
        <h3 className={style.titleReport}>Reportar Info de {namePet} </h3>
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
    </div>
  );
}
