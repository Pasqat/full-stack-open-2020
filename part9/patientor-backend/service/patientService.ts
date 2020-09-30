import patientData from '../data/patients';
import {Patients, NewPatientsEntry, PublicPatient} from '../types';
import {v4 as uuid} from 'uuid';

const patients: Patients[] = patientData;

const getData = (): Array<Patients> => {
    return patients;
};

const getNonSesitiveData = (): PublicPatient[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatient = (id: string): Patients => {
    const findedPatient: Patients[] = patientData.filter(p => p.id === id);
    return findedPatient[0];
};

const addPatient = (entry: NewPatientsEntry): Patients => {
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
