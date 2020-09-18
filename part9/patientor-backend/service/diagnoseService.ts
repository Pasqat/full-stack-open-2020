import diagnoseData from '../data/diagnoses.json';

import { DiagnoseEntry  } from '../types';

const diagnoses: DiagnoseEntry[] = diagnoseData;

const getData = (): Array<DiagnoseEntry> => {
    return diagnoses;
};

// const addData= () => {
//     return null;
// };

export default {
    getData,
    // addData
};