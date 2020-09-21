export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
}

export interface PatientsEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export type NewPatientsEntry = Omit<PatientsEntry, 'id'>;

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}