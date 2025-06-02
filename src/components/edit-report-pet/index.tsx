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

import { useUpdatePet, useDeletePet } from "hooks/pet-hooks";

export function EditReportPet() {
  //// resources
  const navigate = useNavigate();
  const petStorage = JSON.parse(sessionStorage.getItem("pet"));
  const userStorage = JSON.parse(sessionStorage.getItem("user"));

  const { update, responseUpdate } = useUpdatePet();
  const { eliminate, responseDelete } = useDeletePet();

  const [imageSrc, setImageSrc] = useState("");
  const [location, setLocation] = useState("");

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
    if (!userStorage.id && !petStorage.id) {
      navigate("/signin");
    }
    return () => {
      sessionStorage.setItem("pet", JSON.stringify({}));
    };
  }, []);

  useEffect(() => {
    if (responseUpdate) {
      if (responseUpdate.success) {
        toast.success(responseUpdate.message, {
          autoClose: 2000,
          onClose: () => navigate("/mis-reportes"),
        });
      } else {
        toast.error(responseUpdate.message, {
          autoClose: 2000,
          onClose: () => navigate("/mis-reportes"),
        });
      }
    }
  }, [responseUpdate]);

  useEffect(() => {
    if (responseDelete) {
      if (responseDelete.success) {
        toast.success(responseDelete.message, {
          autoClose: 2000,
          onClose: () => navigate("/mis-reportes"),
        });
      } else {
        toast.error(responseDelete.message, {
          autoClose: 2000,
          onClose: () => navigate("/mis-reportes"),
        });
      }
    }
  }, [responseDelete]);

  const handleSendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name").toString();
    const ubication = form.get("ubication").toString();
    update({
      id: petStorage.id,
      name,
      imageUrl: imageSrc,
      ubication,
      state: "perdido",
      lat: markerPosition.latitude,
      long: markerPosition.longitude,
    });
    e.currentTarget.reset();
  };

  const handleDeleteConfirm = () => {
    toast.info(
      <div>
        <p>¿Estás seguro que querés eliminar este reporte?</p>
        <div>
          <MyButton
            color="rojo"
            onClick={() => {
              eliminate({ id: petStorage.id });
              toast.dismiss();
            }}
          >
            Sí, eliminar
          </MyButton>
        </div>

        <div style={{ margin: "20px 0" }}>
          <MyButton
            color="negro"
            onClick={() => {
              toast.dismiss();
            }}
          >
            Cancelar
          </MyButton>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        position: "top-center",
        toastId: "confirm-delete",
      }
    );
  };

  const handleSearchForm = async (e) => {
    e.preventDefault();
    const data = await setLongLat(location);
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

  return (
    <div>
      <div className={style.formMain}>
        <h1>
          Editar o eliminar reporte de{" "}
          {petStorage ? petStorage.name : "Mascota"}
        </h1>

        <form onSubmit={handleSendData}>
          <div className={style.contentInput}>
            <label>Nombre de la mascota</label>
            <MyInput type="text" name="name"></MyInput>
          </div>

          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #999",
              padding: "20px",
              textAlign: "center",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
              width: "300px",
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
            <label>Ciudad - Provincia</label>
            <MyInput
              type="text"
              name="ubication"
              onChange={(e) => {
                setLocation(e.target.value);
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

          <div onClick={() => {}} className={style.contentButton}>
            <MyButton color="azul">Guardar</MyButton>
          </div>
        </form>
        <div className={style.contentButton}>
          <MyButton type="button" onClick={handleDeleteConfirm} color="rojo">
            Eliminar reporte
          </MyButton>
        </div>

        <div className={style.contentButton}>
          <MyButton onClick={() => navigate("/mis-reportes")} color="negro">
            Volver
          </MyButton>
        </div>
      </div>
    </div>
  );
}
