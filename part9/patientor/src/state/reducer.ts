import { State } from "./state";
import {
  Patient,
  Diagnosis,
  // Entry,
  PatientDetails,
} from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: PatientDetails;
    }
  | {
      type: "SET_DIAGNOSIS";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: PatientDetails;
    };

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload,
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload,
  };
};

export const setPatient = (payload: PatientDetails): Action => {
  return {
    type: "SET_PATIENT",
    payload,
  };
};

export const setDiagnosis = (payload: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS",
    payload,
  };
};

export const addEntry = (payload: PatientDetails): Action => {
  return {
    type: "ADD_ENTRY",
    payload,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_DIAGNOSIS":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnosis,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: {
          ...action.payload,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_ENTRY":
      console.log(state.patient);
      console.log("payload", action.payload);
      return {
        ...state,
        patient: {
          ...state.patient,
          entries: [...action.payload.entries]
        },
      };

    default:
      return state;
  }
};
