import { atom } from "jotai";
import { userDataAtom } from "lib/atom-auth-user";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const petAtom = atom({
  userId: "",
  id: "",
  name: "",
  imageUrl: "",
  state: "",
  lat: 0,
  long: 0,
  ubication: "",
});

export const petAtomIdDeleted = atom({
  id: "",
});

export const informantAtom = atom({
  id: "",
  name: "",
  phone: "",
  about: "",
});

export const createPetDerived = atom(async (get) => {
  const data = get(petAtom);
  const { userId, name, imageUrl, state, lat, long, ubication } = data;
  if (userId && imageUrl && lat && long) {
    const res = await fetch(API_BASE_URL + "/pet", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId,
        name,
        imageUrl,
        state,
        lat,
        long,
        ubication,
      }),
    });
    const data = await res.json();
    return data;
  }
});

export const myPetsDerived = atom(async (get) => {
  const data = get(petAtom);
  const { userId } = data;
  if (userId) {
    const res = await fetch(API_BASE_URL + `/pet?userId=${userId}`);
    const data = await res.json();
    return data;
  }
});

export const updatePet = atom(async (get) => {
  const data = get(petAtom);
  const user = get(userDataAtom);
  if (data && user) {
    const { token } = user;
    const { id, name, state, imageUrl, lat, long, ubication } = data;

    if (id && token) {
      try {
        const res = await fetch(API_BASE_URL + "/pet", {
          method: "put",
          headers: {
            "content-type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({
            id,
            name,
            state,
            imageUrl,
            lat,
            long,
            ubication,
          }),
        });
        const data = await res.json();
        return data;
      } catch (error) {
        return {
          success: false,
          message: "Ocurrio un error al actualizar, inténtalo de nuevo",
        };
      }
    }
  }
});

export const deletePet = atom(async (get) => {
  const data = get(petAtomIdDeleted);
  const user = get(userDataAtom);
  if (data && user) {
    const { id } = data;
    const { token } = user;
    if (id) {
      try {
        const res = await fetch(API_BASE_URL + `/pet/${id}`, {
          method: "delete",
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        return {
          success: false,
          message: "Ocurrio un error, inténtalo de nuevo",
        };
      }
    }
  }
});

export const petAround = atom(async (get) => {
  const data = get(petAtom);
  const { userId, lat, long } = data;
  let pathUser;

  if (userId) {
    pathUser = `&userId=${userId}`;
  }
  if (lat && long) {
    try {
      const res = await fetch(
        API_BASE_URL +
          `/pet-around?lat=${lat}&lng=${long}${pathUser ? pathUser : ""}`
      );
      const result = res.json();
      return result;
    } catch (error) {
      return { success: false, message: "Ocurrio un error inténtalo de nuevo" };
    }
  }
});

export const informantReport = atom(async (get) => {
  const data = get(informantAtom);
  const { id, name, phone, about } = data;
  if (id && phone && about) {
    try {
      const res = await fetch(API_BASE_URL + "/report", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          phone,
          about,
        }),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return {
        success: true,
        message: "Ocurrio un error, intentalo de nuevo",
      };
    }
  }
});
