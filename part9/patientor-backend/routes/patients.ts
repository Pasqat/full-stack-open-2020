import express from 'express';
import patientService from '../service/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSesitiveData());
});

// router.post('/', (req,res) => {
//     return null;
// });

export default router;