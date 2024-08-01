// state de la info del usuario que reporta una mascota -- name, telefono, infoDelReporte
import { atom, selector } from "recoil";

const API_BASE_URL = "https://backend-pet-finder-kyyc.onrender.com";

export const userDataReport = atom({
  key: "userDataReport",
  default: {
    reportName: "",
    phoneNumber: "",
    moreAbout: "",
    idPet: 0,
    email: "",
  },
});

export const getEmailReport = atom({
  key: "getEmailReport",
  default: {
    idPet: "",
  },
});

export const reportPet = selector({
  key: "reportPet",

  get: async ({ get }) => {
    const data = get(userDataReport);

    const { reportName, phoneNumber, moreAbout, idPet } = data;

    if (idPet && reportName && phoneNumber && moreAbout) {
      try {
        const res = await fetch(`${API_BASE_URL}/create-report`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            reportName,
            phoneNumber,
            moreAbout,
            id: idPet,
          }),
        });

        //si la respuesta no es exitosa tira error
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const response = await res.json();

        if (response.success) {
          return response;
        } else {
          return response;
        }
        ///
      } catch (error) {
        console.error("Fetch error:", error);
        return { error: error.message };
      }
    }
  },
});

export const sendInfoReport = selector({
  key: "sendInfoReport",

  get: async ({ get }) => {
    const data = get(userDataReport);
    const token = import.meta.env.VITE_TOKEN_RESEND;

    const { email, reportName, phoneNumber, moreAbout } = data;

    if (email) {
      try {
        const res = await fetch(`${API_BASE_URL}/send-email`, {
          method: "post",
          headers: {
            Authorization: ` Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email,
            reportName,
            phoneNumber,
            moreAbout,
          }),
        });

        //si la respuesta no es exitosa tira error
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const response = await res.json();

        return response;

        ///
      } catch (error) {
        console.error("Fetch error:", error);
        return { error: error.message };
      }
    }
  },
});

export const getEmail = selector({
  key: "getEmail",

  get: async ({ get }) => {
    const data = get(getEmailReport);
    const { idPet } = data;

    if (idPet) {
      try {
        const res = await fetch(`${API_BASE_URL}/get-user-pet?id=${idPet}`);

        //si la respuesta no es exitosa tira error
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const response = await res.json();

        if (response.success) {
          return response;
        } else {
          return response;
        }
        ///
      } catch (error) {
        console.error("Fetch error:", error);
        return { error: error.message };
      }
    }
  },
});
