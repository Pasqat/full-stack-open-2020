import patientData from "../data/patients";
import {
    Patients,
    NewPatientsEntry,
    PublicPatient,
    NewEntry,
} from "../types";
import { v4 as uuid } from "uuid";

const patients: Patients[] = patientData;

const getData = (): Array<Patients> => {
    return patients;
};

const getNonSesitiveData = (): PublicPatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getPatient = (id: string): Patients => {
    const findedPatient: Patients[] = patientData.filter((p) => p.id === id);
    return findedPatient[0];
};

const addPatient = (entry: NewPatientsEntry): Omit<Patients, 'entries'> => {
    const newPatientEntry = {
        id: uuid(),
        ...entry,
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (patient: Patients, entry: NewEntry): Patients => {
    const newEntry = {
        ...entry,
        id: uuid()
    }
    const updatePatient: Patients = {
        ...patient,
        entries: patient.entries.concat(newEntry)
    }

    patients.map(element => (
        element.id === patient.id ? element.entries.push(newEntry) : element
    ))
    return updatePatient
};

const findPatientById = (id: string): Patients | undefined => {
    const entry = patients.find(patient => patient.id === id);
    return entry;
};

export default {
    getData,
    getNonSesitiveData,
    addPatient,
    getPatient,
    addEntry,
    findPatientById
};
