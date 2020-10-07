export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

export type PublicPatient = Omit<Patients, "ssn" | "entries">;

export type NewPatientsEntry = Omit<Patients, 'id'>;

interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export enum HealthCheckRating {
    "Healty" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;

}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>

export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>

export enum EntryType {
    Hospital = 'Hospital',
    OccupationalHealthcare = 'OccupationalHealthcare',
    HealthCheck = 'HealthCheck'
  }

export type NewBaseEntry = Omit<BaseEntry, 'id'>

export type NewEntry =
    | NewHospitalEntry
    | NewOccupationalHealthcareEntry
    | NewHealthCheckEntry;