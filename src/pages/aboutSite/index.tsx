///SEO
import { Helmet } from "react-helmet";

import React from "react";
import * as style from "./index.module.css";
import { useNavigate } from "react-router-dom";

import { MyButton } from "ui/button/button";

export function AboutSite() {
  const navigate = useNavigate();
  const handleRoute = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <>
      <Helmet>
        <title>Pet Finder - ABout</title>
        <meta
          name="description"
          content="Conoce más sobre Pet Finder, la aplicación que te ayuda a encontrar mascotas perdidas cerca de tu ubicación."
        />
      </Helmet>
      <div>
        <div className={style.containerMain}>
          <div className={style.containerTitle}>
            <h1>¿Cómo funciona Pet Finder?</h1>
            <p>
              Con nuestra aplicación de Pet Finder, encontrar a tu mascota
              perdida es más fácil que nunca. Solo necesitas registrarte,
              completar tu perfil y, en caso de pérdida, crear un informe
              detallado con la foto y descripción de tu compañero peludo.
              Explora la sección de mascotas perdidas, donde aparecerán las
              mascotas cercanas según tu ubicación. Cuando se logra un
              reencuentro, marca el caso como resuelto y comparte la alegría con
              la comunidad. ¡Hacé que la búsqueda y reunión de mascotas perdidas
              sea una experiencia colaborativa y emotiva con nuestra aplicación!
            </p>
          </div>
          <div className={style.containerImg}>
            <img
              className={style.imgAbout}
              src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1720223316/Pet%20Finder%20React/About%20Site/clzeigi1trs0xtgo1x4f.svg"
              alt=""
            />
          </div>
          <div className={style.containerButton}>
            <MyButton onClick={handleRoute} color="azul">
              Volver
            </MyButton>
          </div>
        </div>
      </div>
    </>
  );
}
