import React, { useEffect } from "react";
import isequal from "lodash.isequal";

import { useAtom, useAtomValue, useSetAtom } from "jotai";

import {
  //atoms
  petAtom,
  petAtomIdDeleted,
  informantAtom,
  //atoms derived
  createPetDerived,
  myPetsDerived,
  deletePet,
  updatePet,
  petAround,
  informantReport,
} from "lib/atom-pets";

export function useCreatePet(petData) {
  const [pet, setPet] = useAtom(petAtom);
  const results = useAtomValue(createPetDerived);

  useEffect(() => {
    if (petData && !isequal(petData, pet)) {
      setPet(petData);
    }
  }, [petData]);

  return results;
}

export function useGetMyPets(petData) {
  const [pet, setPet] = useAtom(petAtom);
  const results = useAtomValue(myPetsDerived);

  useEffect(() => {
    if (petData && !isequal(petData, pet)) {
      setPet(petData);
    }
  }, [petData]);

  return results;
}

export function useUpdatePet() {
  const setPet = useSetAtom(petAtom);
  const responseUpdate = useAtomValue(updatePet);

  const update = (petData) => {
    setPet(petData);
  };

  return { update, responseUpdate };
}

export function useDeletePet() {
  const setPet = useSetAtom(petAtomIdDeleted);
  const responseDelete = useAtomValue(deletePet);

  const eliminate = (data) => {
    setPet(data);
  };
  return { eliminate, responseDelete };
}

export function usePetAround() {
  const setPet = useSetAtom(petAtom);
  const results = useAtomValue(petAround);

  const setLangLong = (data) => {
    setPet(data);
  };
  return { setLangLong, results };
}

export function useCreateInformant() {
  const setInfo = useSetAtom(informantAtom);
  const response = useAtomValue(informantReport);

  const createInformant = (data) => {
    setInfo(data);
  };
  return { createInformant, response };
}
