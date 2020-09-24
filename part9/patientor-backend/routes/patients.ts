import express from "express";
import patientService from "../service/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSesitiveData());
});

router.get("/:id", (req,res) => {
    res.send(patientService.getPatient(req.params.id));
});

router.post("/", (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);

        res.json(addedPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;
