// SEO
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import style from "./index.module.css";
import { MyButton } from "ui/button/button";

import { useSetAtom } from "jotai";
import { userDataAtom } from "lib/atom-auth-user";

export function HomeComponent() {
  const navigate = useNavigate();
  const setUser = useSetAtom(userDataAtom);

  const userStorage = JSON.parse(sessionStorage.getItem("user"));

  // Preload de la imagen LCP
  useEffect(() => {
    if (userStorage?.id) {
      navigate("/mis-datos");
    }
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href =
      "https://res.cloudinary.com/dkzmrfgus/image/upload/v1720134084/Pet%20Finder%20React/Home/ht11bmmsuwlv2z4frftu.svg";
    document.head.appendChild(link);
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
          sessionStorage.setItem(
            "user",
            JSON.stringify({ lat: latitude, long: longitude })
          );
        },
        (error) => {
          toast.error(error.message);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Pet Finder - Home</title>
        <meta
          name="Home"
          content="Pet Finder App: Encontrá y reportá mascotas perdidas cerca de tu ubicación."
        />
      </Helmet>

      <div className={style.containerMain}>
        <div className={style.containerImg}>
          <img
            className={style.imgHome}
            src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1720134084/Pet%20Finder%20React/Home/ht11bmmsuwlv2z4frftu.svg"
            alt="Image-Home"
          />
        </div>

        <div className={style.containerTitle}>
          <h1>Pet Finder App</h1>
          <p>Encontrá y reportá mascotas perdidas cerca de tu ubicación</p>
        </div>
        <div className={style.containerButton}>
          <div className={`${style.buttonSelection} ${style.buttonAuth}`}>
            <MyButton onClick={handleGetLocation} color="azul">
              Dar mi ubicación actual
            </MyButton>
          </div>
          <div className={`${style.buttonSelection} ${style.buttonSecundary}`}>
            <MyButton onClick={handleComoFunciona} color="verde">
              ¿Cómo funciona Pet Finder?
            </MyButton>
          </div>
          <div className={`${style.buttonSelection} `}>
            <MyButton onClick={handleSignup} color="azul">
              Registrarse
            </MyButton>
          </div>
          <div className={`${style.buttonSelection} `}>
            <MyButton onClick={handleSignin} color="verde">
              Iniciar Sesión
            </MyButton>
          </div>
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </>
  );
}
