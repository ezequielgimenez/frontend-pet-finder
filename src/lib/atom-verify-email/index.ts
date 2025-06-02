import { atom } from "jotai";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const userEmailAtom = atom({
  email: "",
});

export const userEmailDerived = atom(async (get) => {
  const data = get(userEmailAtom);
  const { email } = data;
  if (email) {
    try {
      const res = await fetch(API_BASE_URL + `/verify-email/${email}`);

      const result = await res.json();
      return result;
    } catch (error) {
      return {
        success: false,
        message: "Ocurrio un error, inténtalo de nuevo",
      };
    }
  }
});
