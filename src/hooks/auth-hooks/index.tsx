import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

//state main
import { userDataState } from "lib/state-manager-user"; //atom

//selectors fetch's
import { userRegister } from "lib/state-manager-user"; //selector
import { userUpdate } from "lib/state-manager-user"; //selector
import { userUpdatePassword } from "lib/state-manager-user";
import { userAuthToken } from "lib/state-manager-user"; //selector
import { userLogin } from "lib/state-manager-user";
import { mascotasCercas } from "lib/state-manager-user";

export function useRegister(data) {
  const [user, setUser] = useRecoilState(userDataState);
  const userData = useRecoilValue(userRegister);

  useEffect(() => {
    if (data && data !== user) {
      setUser(data);
    }
  }, [data]);

  return userData;
}

export function useUpdate(dataUser) {
  const [user, setUser] = useRecoilState(userDataState);
  const update = useRecoilValue(userUpdate);

  useEffect(() => {
    if (dataUser && dataUser !== user) {
      setUser(dataUser);
    }
  }, [dataUser]);

  return update;
}

export function useUpdatePassword(dataUser) {
  const [user, setUser] = useRecoilState(userDataState);
  const update = useRecoilValue(userUpdatePassword);

  useEffect(() => {
    if (dataUser && dataUser !== user) {
      setUser(dataUser);
    }
  }, [user]);

  return update;
}

export function useAuthToken(dataUser) {
  const [user, setUser] = useRecoilState(userDataState);
  const token = useRecoilValue(userAuthToken);

  useEffect(() => {
    if (dataUser && dataUser !== user) {
      setUser(dataUser);
    }
  }, [user]);

  return token;
}

export function useLogin(userData) {
  const [user, setUser] = useRecoilState(userDataState);
  const myUserData = useRecoilValue(userLogin);

  useEffect(() => {
    if (userData && userData !== user) {
      setUser(userData);
    }
  }, [user]);

  return myUserData;
}

export function useMascotasCercas(data) {
  const [pet, setPet] = useRecoilState(userDataState);
  const results = useRecoilValue(mascotasCercas);

  useEffect(() => {
    if (data && data !== pet) {
      setPet(data);
    }
  }, [pet]);

  return results;
}
