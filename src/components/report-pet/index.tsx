import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import * as style from "./index.module.css";

import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

// Dropzone
import { useDropzone } from "react-dropzone";

// Mapbox
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Fetch setLatLong
import { setLongLat } from "lib/data-fetchs";

//custom hook && atom pet state manager
import { useCreatePet } from "hooks/pet-hooks";
import { petDataState } from "lib/state-manager-pets";

export function ReportPet() {
  const [pet, setPet] = useRecoilState(petDataState);
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState("");

  const [namePet, setNamePet] = useState("");
  const [location, setLocation] = useState("");
  const [saved, setSaved] = useState("");

  // Estado para manejar la vista del mapa y marcador
  const [viewState, setViewState] = React.useState({
    longitude: -58.381775,
    latitude: -34.603851,
    zoom: 7,
  });

  const [markerPosition, setMarkerPosition] = React.useState({
    longitude: -58.381775,
    latitude: -34.603851,
  });

  let userStorage = JSON.parse(sessionStorage.getItem("user"));

  const response = useCreatePet(pet);

  useEffect(() => {
    if (!userStorage) {
      navigate("/signin");
    } else if (!userStorage.id) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (response) {
      if (response.success) {
        sessionStorage.setItem("pet", JSON.stringify(response.data));
        navigate("/report-success");
      } else {
        navigate("/report-error");
      }
    }
  });

  const handleSendData = (e) => {
    e.preventDefault();
    setPet((prevState) => {
      const newState = {
        ...prevState,
        userId: userStorage ? userStorage.id : 0,
        namePet,
        petUbicacion: location,
        petImageUrl: imageSrc,
        estadoPet: "perdido",
        petLat: markerPosition.latitude,
        petLong: markerPosition.longitude,
      };
      return newState;
    });
  };

  const handleNameForm = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    setSaved("Guardado ✔️");
    setTimeout(() => {
      setSaved("");
    }, 3000);

    setNamePet(name);
  };

  const handleSearchForm = async (e) => {
    e.preventDefault();
    const ubicacion = e.target.ubicacion.value;
    setLocation(ubicacion);
    const data = await setLongLat(ubicacion);
    setViewState({
      longitude: data.long,
      latitude: data.lat,
      zoom: 13,
    });
  };

  const handleMapClick = (event) => {
    const { lngLat } = event;
    if (!lngLat) {
      return;
    }
    const { lng, lat } = lngLat;
    setMarkerPosition({ longitude: lng, latitude: lat });

    // Actualiza la vista del mapa al hacer clic
    setViewState((prevState) => ({
      ...prevState,
      longitude: lng,
      latitude: lat,
      zoom: 15, // Ajusta el zoom como desees
    }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageSrc(reader.result); // Actualizamos el estado con la URL de la imagen
        }
      };
      reader.readAsDataURL(file); // Lee el archivo como una URL
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div className={style.mainContainer}>
        <h1>Reportar Mascota</h1>
        <p>
          Ingresá la siguiente información para realizar el reporte de la
          mascota
        </p>

        <div className={style.formMain}>
          <form onSubmit={handleNameForm}>
            <div className={style.contentInput}>
              <label>Nombre de la mascota</label>
              <MyInput type="text" name="name"></MyInput>
            </div>

            <div className={style.contentInput}>
              <img src="" alt="" />
              <div>{saved}</div>
              <MyButton color="azul">Guardar</MyButton>
            </div>
          </form>

          <div className="mapa"></div>

          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <img
              className={style.imgDropzone}
              src={
                imageSrc ||
                "https://res.cloudinary.com/dkzmrfgus/image/upload/v1720653028/Pet%20Finder%20React/Load%20Image/kewox0qmz3upro4rhwnq.png"
              }
              alt=""
            />
          </div>
          <form onSubmit={handleSearchForm}>
            <div className={style.contentInput}>
              <label>Ubicación Ciudad - Provincia</label>
              <MyInput type="text" name="ubicacion"></MyInput>
            </div>

            <div className={style.contentButton}>
              <MyButton color="azul">Buscar</MyButton>
            </div>
          </form>
          <div className={`${style.contentInput} ${style.labelMap}`}>
            <label>Seleccionar un punto en el mapa</label>
          </div>

          <Map
            mapboxAccessToken={import.meta.env.VITE_TOKEN_MAPBOX}
            onClick={handleMapClick}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            style={{ maxWidth: 450, height: 400, borderRadius: 15 }}
          >
            <Marker
              longitude={markerPosition.longitude}
              latitude={markerPosition.latitude}
              anchor="bottom"
            >
              <img
                src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1720669142/Pet%20Finder%20React/Marker/cvsxixlmjeg1rypahna5.png"
                alt="pin"
              />
            </Marker>
          </Map>

          <div onClick={handleSendData} className={style.contentButton}>
            <MyButton color="verde">Reportar Mascota</MyButton>
          </div>
          <div className={style.contentButton}>
            <MyButton color="negro">Cancelar</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
}
