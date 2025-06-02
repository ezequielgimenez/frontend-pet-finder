import { atom } from "jotai";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const userDataAtom = atom({
  userId: "",
  fullName: "",
  email: "",
  password: "",
  passwordActual: "",
  localidad: "",
  lat: 0,
  long: 0,
});

export const userAtomLogin = atom({
  email: "",
  password: "",
});

export const tokenAtom = atom({
  email: "",
  token: "",
  password: "",
});

export const registerDerived = atom(async (get) => {
  const data = get(userDataAtom);
  const { email, fullName, password, localidad, lat, long } = data;
  if (email && password && fullName && lat && long) {
    try {
      const res = await fetch(API_BASE_URL + "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          fullName,
          password,
          localidad,
          lat,
          long,
        }),
      });
      const user = await res.json();
      return user;
    } catch (error) {
      return { success: false, message: "Ocurrio un error inténtalo de nuevo" };
    }
  }
});

export const loginDerived = atom(async (get) => {
  const data = get(userAtomLogin);
  const { email, password } = data;
  if (email && password) {
    try {
      const res = await fetch(API_BASE_URL + "/auth/token", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const token = await res.json();
      return token;
    } catch (error) {
      return { success: false, message: "Ocurrio un error inténtalo de nuevo" };
    }
  }
});

export const tokenDerived = atom(async (get) => {
  const data = get(tokenAtom);
  const { token } = data;
  if (token) {
    try {
      const res = await fetch(API_BASE_URL + "/me", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      const response = await res.json();
      return response;
    } catch (error) {
      return { success: false, message: "Ocurrio un error inténtalo de nuevo" };
    }
  }
});

export const updateDerived = atom(async (get) => {
  const data = get(userDataAtom);
  const { userId, fullName, lat, long } = data;
  if (userId && fullName && lat && long) {
    try {
      const res = await fetch(API_BASE_URL + "/user", {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId,
          fullName,
          lat,
          long,
        }),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return {
        success: false,
        message: "Ocurrio un error al actualizar usuario, inténtalo más tarde",
      };
    }
  }
});

export const updatePassDerived = atom(async (get) => {
  const data = get(userDataAtom);

  const { userId, password, passwordActual } = data;
  if (userId && password && passwordActual) {
    try {
      const res = await fetch(API_BASE_URL + "/user-password", {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId,
          password,
          passwordActual,
        }),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return {
        success: false,
        message: "Ocurrio un error al actualizar password, inténtalo más tarde",
      };
    }
  }
});

export const recoveryPassword = atom(async (get) => {
  const data = get(tokenAtom);
  const { email } = data;
  if (email) {
    try {
      const res = await fetch(API_BASE_URL + "/forgot-password", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return {
        success: false,
        message: "No se pudo enviar el correo. Inténtalo nuevamente más tarde.",
      };
    }
  }
});

export const resetPassword = atom(async (get) => {
  const data = get(tokenAtom);
  const { token, password } = data;
  if (token && password) {
    try {
      const res = await fetch(API_BASE_URL + "/reset-password", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return {
        success: false,
        message: "Ocurrio un error , inténtalo más tarde",
      };
    }
  }
});
