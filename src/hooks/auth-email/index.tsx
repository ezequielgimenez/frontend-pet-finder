import React, { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";

import { useParams } from "react-router-dom";

//state's manager email and token
import { emailAtom } from "lib/state-auth-email";
import { tokenState } from "lib/state-auth-email";

//selector
import { emailState } from "lib/state-auth-email";
import { userForgotPassword } from "lib/state-auth-email";
import { userChangePassword } from "lib/state-auth-email";

export function useEmail(email) {
  const [myEmail, setEmail] = useRecoilState(emailAtom);
  const result = useRecoilValue(emailState);

  useEffect(() => {
    if (email && email !== myEmail) {
      setEmail(email);
    }
  }, [email]);

  return result;
}

export function useForgotPassword(email) {
  const [myEmail, setEmail] = useRecoilState(emailAtom);
  const result = useRecoilValue(userForgotPassword);

  useEffect(() => {
    if (email && email !== myEmail) {
      setEmail(email);
    }
  }, [email]);

  return result;
}

export function useChangePassword(data) {
  const param = useParams();
  const query = param.token;

  const [myData, setMyData] = useRecoilState(tokenState);
  const result = useRecoilValue(userChangePassword);

  useEffect(() => {
    if (query && data) {
      setMyData({
        tokenQuery: query,
        password: data.password,
      });
    }
  }, [param]);

  return result;
}
