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
    entries?: Entry[]
}

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

export type PublicPatient = Omit<Patients, "ssn" | "entries">;

export type NewPatientsEntry = Omit<Patients, 'id' | "entries">;

interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<Diagnose['code']>;
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
    sickLeave?: {
        startDate: string;
        endDate: string;
    }

}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    }
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;
