import patientData from '../data/patients.json';
import { PatientsEntry } from '../types';

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

export default {
    getData,
    getNonSesitiveData
};