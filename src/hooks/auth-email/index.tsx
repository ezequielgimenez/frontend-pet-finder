import React, { useEffect, useState } from "react";

//atoms email
import { userEmailAtom, userEmailDerived } from "lib/atom-verify-email";
//jotai
import { useAtomValue, useSetAtom } from "jotai";

export function useEmail() {
  const setData = useSetAtom(userEmailAtom);
  const result = useAtomValue(userEmailDerived);

  const setEmail = (data) => {
    setData(data);
  };

  return { setEmail, result };
}
