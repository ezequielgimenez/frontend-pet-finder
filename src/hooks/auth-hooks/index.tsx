import React, { useEffect } from "react";
import isequal from "lodash.isequal";
//hooks atom
import { useAtom, useAtomValue, useSetAtom } from "jotai";

type ResponseDB = {
  success: boolean;
  message: string;
  token?: string;
  data?: {
    fullName: string;
    email: string;
    localidad: string;
    lat: number;
    long: number;
  };
};

type RegisterEmailPassword = {
  email?: string;
  password: string;
  passwordNueva?: string;
};

type InputDataBasic = UserState & RegisterEmailPassword;

//atom y derivados
import {
  userDataAtom,
  passwordAtom,
  userNewData,

  //importo tambien el type de mi estadito
  UserState,

  //derivados
  registerDerived,
  loginDerived,
  tokenDerived,
  updateDerived,
  updatePassDerived,
  recoveryPassword,
  resetPassword,
} from "lib/atom-auth-user";

export function useRegister(userData: InputDataBasic): ResponseDB {
  const [user, setUser] = useAtom(userDataAtom);
  const setPassword = useSetAtom(passwordAtom);
  const results = useAtomValue(registerDerived);

  useEffect(() => {
    if (userData && !isequal(userData, user)) {
      setUser(userData);
      setPassword({
        password: userData.password,
      });
    }
  }, [userData]);

  return results;
}

export function useLogin(userData: InputDataBasic): ResponseDB {
  const [emailPassword, setEmailPassword] = useAtom(userDataAtom);
  const setPassword = useSetAtom(passwordAtom);
  const results = useAtomValue(loginDerived);

  useEffect(() => {
    if (userData && !isequal(userData, emailPassword)) {
      setEmailPassword(userData);
      setPassword({
        password: userData.password,
      });
    }
  }, [userData]);

  return results;
}

export function useAuthToken(data: InputDataBasic): ResponseDB {
  const [token, setToken] = useAtom(userDataAtom);
  const results = useAtomValue(tokenDerived);

  useEffect(() => {
    if (data && !isequal(data, token)) {
      setToken(() => ({
        ...data,
      }));
    }
  }, [data]);

  return results;
}

export function useUpdateUser() {
  const setData = useSetAtom(userNewData);
  const result = useAtomValue(updateDerived);

  const setUpdate = (
    data: Pick<UserState, "fullName" | "localidad" | "lat" | "long">
  ) => {
    setData(data);
  };

  return { setUpdate, result };
}

export function useUpdatePassword() {
  const setPassword = useSetAtom(passwordAtom);
  const result = useAtomValue(updatePassDerived);

  const setUpdate = (data: RegisterEmailPassword) => {
    setPassword(data);
  };

  return { setUpdate, result };
}

export function useRecoveryPassword() {
  const setData = useSetAtom(userDataAtom);
  const result = useAtomValue(recoveryPassword);

  const setEmail = (email) => {
    setData(email);
  };

  return { setEmail, result };
}

export function useResetPassword() {
  const setData = useSetAtom(userDataAtom);
  const setPassword = useSetAtom(passwordAtom);

  const response = useAtomValue(resetPassword);

  const setTokenPassword = (data: InputDataBasic) => {
    setData({
      token: data.token,
    });
    setPassword({
      password: data.password,
    });
  };

  return { setTokenPassword, response };
}
