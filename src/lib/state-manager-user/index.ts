import { atom, selector } from "recoil";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const userDataState = atom({
  key: "userDataState",
  default: {
    fullName: "",
    email: "",
    password: "",
    passwordActual: "",
    localidad: "",
    lat: 0,
    long: 0,
    userId: "",
    token: "",
  },
});

export const userRegister = selector({
  key: "userRegister",
  get: async ({ get }) => {
    const data = get(userDataState);

    const { fullName, email, password, localidad } = data;

    // Verificar si todos los campos están llenos
    if (email && password) {
      try {
        const res = await fetch(`${API_BASE_URL}/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
            localidad,
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
    } else {
      return { error: "Email y password requerido para el registro" };
    }
  },
});

export const userUpdate = selector({
  key: "userUpdate",
  get: async ({ get }) => {
    const data = get(userDataState);

    const { userId, fullName, email, password, localidad, lat, long } = data;

    if (userId && email && password && localidad) {
      try {
        const res = await fetch(`${API_BASE_URL}/update-data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
            localidad,
            userId,
            lat,
            long,
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

export const userUpdatePassword = selector({
  key: "userUpdatePassword",
  get: async ({ get }) => {
    const data = get(userDataState);

    const { userId, password, passwordActual } = data;

    if (userId && password && passwordActual) {
      try {
        const res = await fetch(`${API_BASE_URL}/update-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            passwordActual,
            password,
            userId,
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
    } else {
      return {
        error: "No hay userId o no se pudo actualizar correctamente el user",
      };
    }
  },
});

export const userAuthToken = selector({
  key: "userAuthToken",
  get: async ({ get }) => {
    const data = get(userDataState);

    const { email, password } = data;

    if (email && password) {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
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
    } else {
      return { error: "Email and password are required" };
    }
  },
});

export const userLogin = selector({
  key: "userLogin",
  get: async ({ get }) => {
    const data = get(userDataState);

    const { token } = data;

    if (token) {
      try {
        const res = await fetch(`${API_BASE_URL}/me`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
    } else {
      return { error: "No hay un token aún para verificar el user" };
    }
  },
});

export const mascotasCercas = selector({
  key: "mascotasCercas",
  get: async ({ get }) => {
    const data = get(userDataState);

    const { lat, long } = data;

    // Verificar si todos los campos están llenos
    if (lat && long) {
      try {
        const res = await fetch(
          `${API_BASE_URL}/mascotas-cerca-de?=&lat=${lat}&lng=${long}`
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
