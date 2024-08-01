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

//atom pet state manager
import { petDataState } from "lib/state-manager-pets";
import { deleteState } from "lib/state-manager-pets";
//custom hook
import { useEditReport } from "hooks/pet-hooks";
import { useDeleteReport } from "hooks/pet-hooks";

export function EditReportPet() {
  //// resources
  const navigate = useNavigate();
  const petStorage = JSON.parse(sessionStorage.getItem("pet"));
  const storage = JSON.parse(sessionStorage.getItem("user"));

  //// state's
  const [pet, setPet] = useRecoilState(petDataState);
  const [idPet, setIdPet] = useRecoilState(deleteState);
  const [imageSrc, setImageSrc] = useState("");

  const [namePet, setNamePet] = useState("");
  const [location, setLocation] = useState("");
  const [saved, setSaved] = useState("");
  const [eliminar, setEliminar] = useState("");

  //// custom hooks
  const response = useEditReport(pet);
  const deleted = useDeleteReport(pet.idPet);

  //// Estado para manejar la vista del mapa y marcador
  const [viewState, setViewState] = React.useState({
    longitude: -58.381775,
    latitude: -34.603851,
    zoom: 7,
  });
  const [markerPosition, setMarkerPosition] = React.useState({
    longitude: -58.381775,
    latitude: -34.603851,
  });

  useEffect(() => {
    if (!storage) {
      navigate("/signin");
    } else if (!storage.id) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (response) {
      if (response.success) {
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
        idPet: petStorage ? petStorage.id : 0,
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

  const handleDeleted = () => {
    setIdPet(petStorage ? petStorage.id : 0);
  };

  useEffect(() => {
    if (deleted) {
      if (deleted.success) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        setEliminar("Reporte eliminado ✔️ redirigiendo..");
        setTimeout(() => {
          navigate("/mis-reportes");
        }, 3000);
      } else {
        setEliminar(deleted.message);
      }
    }
  }, [deleted]);

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
        <h1>Editar Reporte de Mascota</h1>

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
            <MyButton color="azul">Guardar</MyButton>
          </div>

          <div onClick={handleDeleted} className={style.contentButton}>
            <MyButton color="rojo">Eliminar reporte</MyButton>
          </div>
          <div>{eliminar}</div>

          <div className={style.contentButton}>
            <MyButton color="negro">Volver</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
}
