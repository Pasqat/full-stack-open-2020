/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatientsEntry,
  Gender,
  NewEntry,
//   Entry,
  HealthCheckRating,
  Discharge,
  SickLeave,
  NewBaseEntry,
  NewHospitalEntry,
  NewHealthCheckEntry,
  NewOccupationalHealthcareEntry,
  EntryType
} from "./types";

const toNewPatientEntry = (object: any): NewPatientsEntry => {
  return {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries: object.entries ? object.entries : [],
  };
};

const toNewEntry = (object: any | undefined): NewEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
    ...otherValues
  } = object;

  console.log("object", object);

  const NewBaseEntry: NewBaseEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
  };

  if (diagnosisCodes) {
    NewBaseEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  }

  const entryType = parseEntryType(type);

  switch (entryType) {
    case "HealthCheck":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { healtCheckRating } = otherValues;
      const healtCheckEntry: NewHealthCheckEntry = {
        type: entryType,
        ...NewBaseEntry,
        healthCheckRating: parseHealtCheckRating(healtCheckRating),
      };
      return healtCheckEntry;

    case "Hospital":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { discharge } = otherValues;
      const hospitalEntry: NewHospitalEntry = {
        type: entryType,
        ...NewBaseEntry,
        discharge: parseDischarge(discharge),
      };
      return hospitalEntry;

    case "OccupationalHealthcare":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { emplayerName, sickLeave } = otherValues;

      const occupationalHealtCareEntry: NewOccupationalHealthcareEntry = {
        type: entryType,
        ...NewBaseEntry,
        employerName: parseName(emplayerName),
      };

      if (sickLeave) {
        occupationalHealtCareEntry.sickLeave = parseSickLeave(sickLeave);
      }

      return occupationalHealtCareEntry;

    default:
      return assertNever({ ...object });
  }
};

/* ================== PARSER ===================== */
const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }

  return name;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }

  return ssn;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date: " + dateOfBirth);
  }

  return dateOfBirth;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }

  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }

  return occupation;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date)) {
    throw new Error("Incorrect or missing occupation: " + date);
  }

  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing: " + specialist);
  }

  return specialist;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing: " + description);
  }

  return description;
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {
  if (!Array.isArray(diagnosisCodes) || !isArray(diagnosisCodes)) {
    throw new Error("Incorrect or missing: " + diagnosisCodes);
  }

  return diagnosisCodes;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect on missing discharge: ' + discharge);
  }
  const { date, criteria } = discharge;
  if (!isDate(date)) {
    throw new Error("Incorrect or missing Date");
  }
  if (!isString(criteria)) {
    throw new Error("Incorrect or missing Criteria");
  }
  return discharge;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error(`Incorrect on missing` + sickLeave);
  }
  const { startDate, endDate } = sickLeave;
  if (!isDate(startDate)) {
    throw new Error("Incorrect or missing start date");
  }
  if (!isDate(endDate)) {
    throw new Error("Incorrect or missing end date");
  }
  return sickLeave;
};

// const parseType = (type: any): Entry["type"] => {
//   if (
//     !type ||
//     type !== "HealtCheck" ||
//     type !== "OccupationalHealtcare" ||
//     type !== "Hospital"
//   ) {
//     throw new Error("Incorrect or missing: " + type);
//   }

//   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//   return type;
// };

const parseEntryType = (entryType: any): EntryType => {
  if (!entryType || !isString(entryType) || !isEntryType(entryType)) {
    throw new Error("Incorrect or missing: " + entryType);
  }
  return entryType
};

const parseHealtCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (
    !(healthCheckRating === 0 || healthCheckRating <= 3) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error("Incorrect or missing gender: " + healthCheckRating);
  }

  return healthCheckRating;
};

const assertNever = (value: any | never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

/* ================== VALIDATOR ===================== */
const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isArray = (param: any[]): param is string[] => {
  return param.every(
    (element: any) => typeof element === "string" || element instanceof String
  );
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const isDischarge = (param: any): param is Discharge => {
  return (
    Object.keys(param).includes("date") &&
    Object.keys(param).includes("criteria")
  );
};

const isSickLeave = (param: any): param is SickLeave => {
  return (
    Object.keys(param).includes("startDate") &&
    Object.keys(param).includes("endDate")
  );
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

export { toNewPatientEntry, toNewEntry };
