import { atom } from "jotai";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type UserState = {
  id?: number;
  fullName?: string;
  email?: string;
  localidad?: string;
  lat?: number;
  long?: number;
  token?: string;
};

export type UserNewValue = {
  fullName?: string;
  localidad?: string;
  lat?: number;
  long?: number;
};

export const userNewData = atom<UserNewValue | null>();

//aca como es una contraseña la guardo transitoriamente
export const passwordAtom = atom<{
  password: string;
  passwordNueva?: string;
}>();

//aca guardo data del user persistente combinado con sessionStorage
export const userDataAtom = atom<UserState | null>();

userDataAtom.onMount = (set) => {
  const userStorage = JSON.parse(sessionStorage.getItem("user"));
  if (userStorage) {
    set(userStorage);
  } else {
    set(null);
  }
};

export const registerDerived = atom(async (get) => {
  const data = get(userDataAtom);
  const passwordData = get(passwordAtom);

  if (data && passwordData) {
    const { email, fullName, localidad, lat, long } = data;
    const { password } = passwordData;

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
        return {
          success: false,
          message: "Ocurrio un error inténtalo de nuevo",
        };
      }
    }
  }
});

export const loginDerived = atom(async (get) => {
  const data = get(userDataAtom);
  const passwordData = get(passwordAtom);

  if (data && passwordData) {
    const { email } = data;
    const { password } = passwordData;

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
        return {
          success: false,
          message: "Ocurrio un error inténtalo de nuevo",
        };
      }
    }
  }
});

export const tokenDerived = atom(async (get) => {
  const data = get(userDataAtom);
  if (data) {
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
        return {
          success: false,
          message: "Ocurrio un error inténtalo de nuevo",
        };
      }
    }
  }
});

export const updateDerived = atom(async (get) => {
  const data = get(userDataAtom);
  const newData = get(userNewData);
  if (data && newData) {
    const { token } = data;
    const { fullName, localidad, lat, long } = newData;

    if (fullName && lat && long) {
      try {
        const res = await fetch(API_BASE_URL + "/user", {
          method: "put",
          headers: {
            "content-type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({
            fullName,
            lat,
            long,
            localidad,
          }),
        });
        const result = await res.json();
        return result;
      } catch (error) {
        return {
          success: false,
          message:
            "Ocurrio un error al actualizar usuario, inténtalo más tarde",
        };
      }
    }
  }
});

export const updatePassDerived = atom(async (get) => {
  const data = get(userDataAtom);
  const passwordData = get(passwordAtom);
  if (data && passwordData) {
    const { token } = data;
    const { password, passwordNueva } = passwordData;

    if (token && password && passwordNueva) {
      try {
        const res = await fetch(API_BASE_URL + "/user-password", {
          method: "put",
          headers: {
            "content-type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({
            password,
            passwordNueva,
          }),
        });
        const result = await res.json();
        return result;
      } catch (error) {
        return {
          success: false,
          message:
            "Ocurrio un error al actualizar password, inténtalo más tarde",
        };
      }
    }
  }
});

export const recoveryPassword = atom(async (get) => {
  const data = get(userDataAtom);
  if (data) {
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
          message:
            "No se pudo enviar el correo. Inténtalo nuevamente más tarde.",
        };
      }
    }
  }
});

export const resetPassword = atom(async (get) => {
  const data = get(userDataAtom);
  const passwordData = get(passwordAtom);
  if (data && passwordData) {
    const { token } = data;
    const { password } = passwordData;

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
  }
});
