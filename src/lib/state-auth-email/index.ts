import { atom, selector } from "recoil";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const emailAtom = atom({
  key: "userData",
  default: {
    email: "",
  },
});

export const tokenState = atom({
  key: "tokenState",
  default: {
    tokenQuery: "",
    password: "",
  },
});

//selector para verificar un email si esta registrado en la base de datos y poder seguir asi el logueo
export const emailState = selector({
  key: "emailState",
  get: async ({ get }) => {
    const data = get(emailAtom);

    const { email } = data;
    if (email) {
      try {
        const res = await fetch(API_BASE_URL + "/verify-email", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const response = await res.json();

        if (response.success) {
          return response;
        } else {
          return response;
        }
      } catch (error) {
        console.error("Fetch error:", error);
        return { error: error.message };
      }
    } else {
      return "Aun no hay email ingresado";
    }
  },
});

//selector para iniciar el recupero de contraseña enviando al email registrado un token
export const userForgotPassword = selector({
  key: "userForgotPassword",
  get: async ({ get }) => {
    const data = get(emailAtom);

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

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const response = await res.json();

        if (response.success) {
          return response;
        } else {
          return response;
        }
      } catch (error) {
        console.error("Fetch error:", error);
        return { error: error.message };
      }
    } else {
      return "Aun no hay email ingresado";
    }
  },
});

//selector para ir a un enlace con un token y cambiar el password
export const userChangePassword = selector({
  key: "userchangePassword",
  get: async ({ get }) => {
    const data = get(tokenState);

    const { tokenQuery, password } = data;
    if (tokenQuery && password) {
      try {
        const res = await fetch(
          API_BASE_URL + `/reset-password?token=${tokenQuery}`,
          {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              password,
            }),
          }
        );

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const response = await res.json();

        if (response.success) {
          return response;
        } else {
          return response;
        }
      } catch (error) {
        console.error("Fetch error:", error);
        return { error: error.message };
      }
    }
  },
});
