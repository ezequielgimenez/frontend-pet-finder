import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import style from "./index.module.css";
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

// Dropzone
import { useDropzone } from "react-dropzone";

// Mapbox
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

// Fetch setLatLong
import { setLongLat } from "lib/data-fetchs";

//custom hook && atom pet state manager
import { useCreatePet } from "hooks/pet-hooks";

export function ReportPet() {
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [ubicacion, setUbicacion] = useState(null);

  // estado para manejar la vista del mapa
  const [viewState, setViewState] = React.useState({
    longitude: -58.381775,
    latitude: -34.603851,
    zoom: 10,
  });

  //estado para obtener lat y long q esta marcado en el mapa
  const [markerPosition, setMarkerPosition] = React.useState({
    longitude: -58.381775,
    latitude: -34.603851,
  });

  const userStorage = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!userStorage?.id) {
      navigate("/auth");
    }
  }, []);

  const response = useCreatePet(pet);

  useEffect(() => {
    if (response) {
      if (response.success) {
        toast.success(response.message, {
          autoClose: 2000,
          onClose: () => navigate("/mis-reportes"),
        });
        sessionStorage.setItem("pet", JSON.stringify(response.data));
      } else {
        toast.error(response.message, {
          autoClose: 2000,
          onClose: () => navigate("/report-pet"),
        });
      }
    }
  }, [response]);

  const handleSearchForm = async (e) => {
    e.preventDefault();
    setUbicacion(ubicacion);
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
      zoom: 15,
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

  const handleFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name").toString();
    const ubicacion = form.get("ubicacion").toString();
    const data = {
      userId: userStorage.id,
      name,
      ubication: ubicacion,
      state: "perdido",
      imageUrl: imageSrc,
      lat: markerPosition.latitude,
      long: markerPosition.longitude,
    };

    setPet(data);
    e.currentTarget.reset();
  };

  return (
    <div className={style.mainContainer}>
      <form onSubmit={handleFormData}>
        <h1>Reportar Mascota</h1>
        <p>
          Ingresá la siguiente información para realizar el reporte de la
          mascota
        </p>

        <div>
          <div className={style.contentInput}>
            <label>Nombre de la mascota</label>
            <MyInput type="text" name="name"></MyInput>
          </div>

          <div className={style.contentInput}>
            <img src="" alt="" />
          </div>

          <div className="mapa"></div>

          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #999",
              padding: "20px",
              textAlign: "center",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
              width: "310px",
              margin: "auto",
            }}
          >
            <input {...getInputProps()} />
            {imageSrc ? (
              <img className={style.imgDropzone} src={imageSrc} alt="" />
            ) : (
              <p>
                Arrastre una imagen y suelte aquí o haz click y selecciona una
                (Hasta 10mb)
              </p>
            )}
          </div>
          <div className={style.contentInput}>
            <label> Ciudad - Provincia </label>
            <MyInput
              type="text"
              name="ubicacion"
              onChange={(e) => {
                setUbicacion(e.target.value);
              }}
            ></MyInput>
          </div>

          <div onClick={handleSearchForm} className={style.contentButton}>
            <MyButton type="button" color="azul">
              Buscar
            </MyButton>
          </div>

          <div className={`${style.contentInput} ${style.labelMap}`}>
            <label>Seleccionar un punto en el mapa</label>
          </div>

          <Map
            mapboxAccessToken="pk.eyJ1IjoiZXplZGV2MzgiLCJhIjoiY2x1eDRnMjBsMGx1ZjJxbzN1cnJkN2QwciJ9.5-j1Rphu38Wo_4eytVJH1A"
            onClick={handleMapClick}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            style={{
              maxWidth: 450,
              height: 400,
              borderRadius: 15,
            }}
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

          <div className={style.contentButton}>
            <MyButton color="verde">Reportar Mascota</MyButton>
          </div>
        </div>
      </form>
      <div className={style.contentButton}>
        <MyButton color="negro">Cancelar</MyButton>
      </div>
    </div>
  );
}
