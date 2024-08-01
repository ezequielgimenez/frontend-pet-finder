import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

//state pet manager // atom
import { userDataReport } from "lib/state-manager-user-report";
import { getEmailReport } from "lib/state-manager-user-report";

//selectors
import { reportPet } from "lib/state-manager-user-report";
import { sendInfoReport } from "lib/state-manager-user-report";
import { getEmail } from "lib/state-manager-user-report";

export function useReportPet(data) {
  const [reportData, setReportData] = useRecoilState(userDataReport);
  const result = useRecoilValue(reportPet);

  useEffect(() => {
    if (data && data !== reportData) {
      setReportData(data);
    }
  }, [reportData]);

  return result;
}

export function useSendInfoReport(data) {
  const [reportData, setReportData] = useRecoilState(userDataReport);
  const result = useRecoilValue(sendInfoReport);

  useEffect(() => {
    if (data && data !== reportData) {
      setReportData(data);
    }
  }, [reportData]);

  return result;
}

export function useGetEmail(id) {
  const [idPet, setId] = useRecoilState(getEmailReport);
  const result = useRecoilValue(getEmail);

  useEffect(() => {
    if (id && id !== idPet) {
      setId(id);
    }
  }, [idPet]);

  return result;
}
