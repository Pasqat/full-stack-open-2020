import patientData from '../data/patients';
import { PatientsEntry, NewPatientsEntry, PublicPatient } from '../types';
import {v4 as uuid } from 'uuid';

const patients: PatientsEntry[] = patientData;

const getData = (): Array<PatientsEntry> => {
    return patients;
};

const getNonSesitiveData = (): PublicPatient[] => {
    return patientData.map(({id,name,dateOfBirth,gender,occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatient = (id: string): PatientsEntry => {
    const findedPatient: PatientsEntry[] = patientData.filter(p => p.id === id);
    return findedPatient[0];
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
    getPatient,
};