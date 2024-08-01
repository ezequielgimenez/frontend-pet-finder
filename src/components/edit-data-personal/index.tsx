import React, { useEffect, useState } from "react";
import * as style from "./index.module.css";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

//ui
import { MyInput } from "ui/input/input";
import { MyButton } from "ui/button/button";

//state registro user atom
import { userDataState } from "lib/state-manager-user";
//hooks
import { useUpdate } from "hooks/auth-hooks";
//fetch long lat
import { setLongLat } from "lib/data-fetchs";

export function EditData() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  // // Traer la data del sessionStorage que tiene data de la DB y id

  let storage = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!storage) {
      navigate("/signin");
    } else if (!storage.id) {
      navigate("/signin");
    }
  }, []);

  //uso el recoilState del atom para setear nuevos datos(mi data principal del state)
  const [user, setDataUser] = useRecoilState(userDataState);
  const response = useUpdate(user);

  const handleFormData = async (e) => {
    e.preventDefault();
    const fullName = e.target.name.value;
    const localidad = e.target.localidad.value;

    if (!fullName || !localidad) {
      alert("Por favor, no dejes campos sin completar.");
      return;
    }

    // Obtener latitud y longitud
    const result = await setLongLat(localidad);

    // Actualizar estado con fullName, localidad, lat y long
    setDataUser((prevState) => {
      const newState = {
        ...prevState,
        fullName,
        userId: storage ? storage.id : "",
        localidad,
        lat: result.lat,
        long: result.long,
      };
      return newState;
    });

    e.target.reset();
  };

  useEffect(() => {
    if (response) {
      if (response.success) {
        setMessage(response.message);
        // Actualizar la variable `storage` después de guardar la nueva data
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        setMessage(response.message);
      }
    }
  }, [response]);

  return (
    <div>
      <div className={style.subContent}>
        <h1>Datos Personales</h1>
      </div>
      <form className={style.form} onSubmit={handleFormData}>
        <div className={style.contentInput}>
          <label htmlFor="">NOMBRE</label>
          <MyInput type="text" name="name"></MyInput>
        </div>
        <div className={style.contentInput}>
          <label htmlFor="">LOCALIDAD</label>
          <MyInput type="text" name="localidad"></MyInput>
        </div>
        <div>{message}</div>
        <div>
          <MyButton color="azul">Guardar</MyButton>
        </div>
      </form>
    </div>
  );
}
