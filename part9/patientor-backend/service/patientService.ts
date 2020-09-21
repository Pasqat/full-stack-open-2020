import patientData from '../data/patients';
import { PatientsEntry, NewPatientsEntry } from '../types';
import {v4 as uuid } from 'uuid';

const patients: PatientsEntry[] = patientData;

const getData = (): Array<PatientsEntry> => {
    return patients;
};

const getNonSesitiveData = (): Omit<PatientsEntry, 'ssn'>[] => {
    return patientData.map(({id,name,dateOfBirth,gender,occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatientsEntry): PatientsEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getData,
    getNonSesitiveData,
    addPatient,
};