import diagnoseData from '../data/diagnoses.json';

import {Diagnose} from '../types';

const diagnoses: Diagnose[] = diagnoseData;

const getData = (): Array<Diagnose> => {
    return diagnoses;
};

// const addData= () => {
//     return null;
// };

export default {
    getData,
    // addData
};
