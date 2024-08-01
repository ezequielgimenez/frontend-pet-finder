import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

//state pet manager // atom
import { petDataState } from "lib/state-manager-pets";
import { queryState } from "lib/state-manager-pets";
import { deleteState } from "lib/state-manager-pets";

//selectors
import { createPet } from "lib/state-manager-pets";
import { myPetsReport } from "lib/state-manager-pets";
import { EditReport } from "lib/state-manager-pets";
import { deleteReport } from "lib/state-manager-pets";

export function useCreatePet(petData) {
  const [pet, setPet] = useRecoilState(petDataState);
  const result = useRecoilValue(createPet);

  useEffect(() => {
    if (petData && petData !== pet) {
      setPet(petData);
    }
  }, [pet]);

  return result;
}

export function useGetMyPets() {
  const [userId, setUserId] = useRecoilState(queryState);
  const result = useRecoilValue(myPetsReport);

  useEffect(() => {
    if (userId) {
      setUserId(userId);
    }
  }, [userId]);

  return result;
}

export function useEditReport(update) {
  const [pet, setPet] = useRecoilState(petDataState);
  const result = useRecoilValue(EditReport);

  useEffect(() => {
    if (update && update !== pet) {
      setPet(update);
    }
  }, [pet]);

  return result;
}

export function useDeleteReport(id) {
  const [idPet, setIdPet] = useRecoilState(deleteState);
  const result = useRecoilValue(deleteReport);

  useEffect(() => {
    if (id && id !== idPet) {
      setIdPet(idPet);
    }
  }, [idPet]);

  return result;
}
