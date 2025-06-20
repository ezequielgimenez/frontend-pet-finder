import React, { useEffect } from "react";
import isequal from "lodash.isequal";

//hooks atom
import { useAtom, useAtomValue, useSetAtom } from "jotai";

//atom y derivados
import {
  userDataAtom,

  //derivados
  registerDerived,
  loginDerived,
  tokenDerived,
  updateDerived,
  updatePassDerived,
  recoveryPassword,
  resetPassword,
} from "lib/atom-auth-user";

export function useRegister(userData) {
  const [user, setUser] = useAtom(userDataAtom);
  const results = useAtomValue(registerDerived);

  useEffect(() => {
    if (userData && !isequal(userData, user)) {
      setUser((prev) => ({
        ...prev,
        ...userData,
      }));
    }
  }, [userData]);

  return results;
}

export function useLogin(data) {
  const [emailPassword, setEmailPassword] = useAtom(userDataAtom);
  const results = useAtomValue(loginDerived);

  useEffect(() => {
    if (data && !isequal(data, emailPassword)) {
      setEmailPassword(data);
    }
  }, [data]);

  return results;
}

export function useAuthToken(data) {
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
  const setData = useSetAtom(userDataAtom);
  const result = useAtomValue(updateDerived);

  const setUpdate = (data) => {
    setData(data);
  };

  return { setUpdate, result };
}

export function useUpdatePassword() {
  const setData = useSetAtom(userDataAtom);
  const result = useAtomValue(updatePassDerived);

  const setUpdate = (data) => {
    setData(data);
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
  const response = useAtomValue(resetPassword);
  const setTokenPassword = (data) => {
    setData(data);
  };

  return { setTokenPassword, response };
}
