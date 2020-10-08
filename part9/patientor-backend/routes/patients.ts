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

  console.log('patient',patient)

  if (patient) {
    try {
      const newEntry = toNewEntry(req.body)

      console.log('new Entry',newEntry)

      const updatePatient = patientService.addEntry(patient, newEntry)

      console.log('updated Patient', updatePatient)

      res.json(updatePatient)
    } catch (error) {
      const { message } = error as Error

      console.log('message', message)

      res.status(400).json({ error: message })
    }
  } else {
    const error = `Patient doesn't exist`
    res.status(404).json({ error })
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);

    res.json(addedPatient);
  } catch (error) {
    const { message } = error as Error
    res.status(400).json({ error: message })
  }
});

export default router;
