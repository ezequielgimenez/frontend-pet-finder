// SEO
import { Helmet } from "react-helmet";

import React, { useEffect, useState } from "react";
import * as style from "./index.module.css";
import { animateScroll as scroll } from "react-scroll";
import { useRecoilState } from "recoil";

import { MyButton } from "ui/button/button";

import { userDataState } from "lib/state-manager-user";
import { useNavigate } from "react-router-dom";

export function HomeComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [user, setDataUser] = useRecoilState(userDataState);

  const userStorage = JSON.parse(sessionStorage.getItem("user"));

  // Preload de la imagen LCP
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href =
      "https://res.cloudinary.com/dkzmrfgus/image/upload/v1720134084/Pet%20Finder%20React/Home/ht11bmmsuwlv2z4frftu.svg";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (userStorage && userStorage.id) {
      navigate("/mis-datos");
    }
  }, []);

  useEffect(() => {
    scroll.scrollToBottom({
      duration: 800, // Duración del desplazamiento en milisegundos
      delay: 0, // Retraso antes de iniciar el desplazamiento en milisegundos
      smooth: "easeInOutQuart", // Tipo de transición suave
    });
  }, []);

  const handleSignup = (e) => {
    e.preventDefault;
    navigate("/signup");
  };

  const handleComoFunciona = (e) => {
    e.preventDefault;
    navigate("/about");
  };

  const handleSignin = (e) => {
    e.preventDefault;
    navigate("/auth");
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDataUser((prevData) => {
            const newState = {
              ...prevData,
              lat: latitude,
              long: longitude,
            };

            return newState;
          });

          setError(null);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Pet Finder - Home</title>
        <meta
          name="description"
          content="Pet Finder App: Encontrá y reportá mascotas perdidas cerca de tu ubicación."
        />
      </Helmet>
      <div className={style.containerMain}>
        <div className={style.containerImg}>
          <img
            className={style.imgHome}
            src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1720134084/Pet%20Finder%20React/Home/ht11bmmsuwlv2z4frftu.svg"
            alt=""
          />
        </div>
        <div className={style.containerTitle}>
          <h1>Pet Finder App</h1>
          <p>Encontrá y reportá mascotas perdidas cerca de tu ubicación</p>
        </div>
        <div className={style.containerButton}>
          <div className={style.buttonSelection}>
            <MyButton onClick={handleGetLocation} color="azul">
              Dar mi ubicación actual
            </MyButton>
          </div>
          <div className={`${style.buttonSelection} ${style.buttonSecundary}`}>
            <MyButton onClick={handleComoFunciona} color="verde">
              ¿Cómo funciona Pet Finder?
            </MyButton>
          </div>
          <div className={`${style.buttonSelection} ${style.buttonAuth}`}>
            <MyButton onClick={handleSignup} color="azul">
              Registrarse
            </MyButton>
          </div>
          <div className={`${style.buttonSelection} ${style.buttonAuth}`}>
            <MyButton onClick={handleSignin} color="verde">
              Iniciar Sesión
            </MyButton>
          </div>
        </div>
      </div>
    </>
  );
}
