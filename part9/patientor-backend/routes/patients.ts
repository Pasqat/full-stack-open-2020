import express from "express";
import patientService from "../service/patientService";
import {
  toNewPatientEntry,
  toNewEntry
} from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSesitiveData());
});

router.get("/:id", (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post("/:id/entries", (req, res) => {
  const patient = patientService.findPatientById(req.params.id)

  if(patient) {
    try {
      const newEntry = toNewEntry(req.body)
      const updatePatient = patientService.addEntry(patient, newEntry)

      res.json(updatePatient)
    } catch(error) {
      const { message } = error as Error
      res.status(400).json({error: message })
    }
  } else {
    const error  = `Patient doesn't exist`
    res.status(404).json({error})
  }
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
