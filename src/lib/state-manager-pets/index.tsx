import { atom, selector } from "recoil";

const API_BASE_URL = "https://backend-pet-finder-kyyc.onrender.com";

export const petDataState = atom({
  key: "petDataState",
  default: {
    userId: 0,
    idPet: "",
    namePet: "",
    petImageUrl: "",
    estadoPet: "",
    petLat: 0,
    petLong: 0,
    petUbicacion: "",
  },
});

export const queryState = atom({
  key: "queryState",
  default: "",
});

export const deleteState = atom({
  key: "deletedPet",
  default: "",
});

export const createPet = selector({
  key: "createPet",
  get: async ({ get }) => {
    const data = get(petDataState);

    const {
      userId,
      namePet,
      petImageUrl,
      estadoPet,
      petLat,
      petLong,
      petUbicacion,
    } = data;

    // Verificar si todos los campos están llenos
    if (userId) {
      try {
        const res = await fetch(`${API_BASE_URL}/create-pet`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            namePet,
            petImageUrl,
            estadoPet,
            petLat,
            petLong,
            petUbicacion,
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

export const myPetsReport = selector({
  key: "myPetsReport",
  get: async ({ get }) => {
    const userId = get(queryState);

    // Verificar si todos los campos están llenos
    if (userId) {
      try {
        const res = await fetch(
          `${API_BASE_URL}/mis-mascotas?userId=${userId}`
        );

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

export const EditReport = selector({
  key: "EditReport",
  get: async ({ get }) => {
    const data = get(petDataState);
    const {
      idPet,
      namePet,
      petImageUrl,
      estadoPet,
      petLat,
      petLong,
      petUbicacion,
    } = data;

    // Verificar si todos los campos están llenos
    if (idPet) {
      try {
        const res = await fetch(`${API_BASE_URL}/update-report`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: idPet,
            namePet,
            petImageUrl,
            estadoPet,
            petLat,
            petLong,
            petUbicacion,
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

export const deleteReport = selector({
  key: "deleteReport",
  get: async ({ get }) => {
    const idPet = get(deleteState);

    // Verificar si todos los campos están llenos
    if (idPet) {
      try {
        const res = await fetch(`${API_BASE_URL}/delete-report`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
