import express from "express";
// import { Patient } from "../types";
// import toNewDiaryEntry from "../utils";
import patients from "../data/patients";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patients);
});

router.get("/:id", (req, res) => {
  const patient = patients.find((p) => p.id === req.params.id);

  if (!patient) {
    return res.status(404).send("Patient not found");
  }

  return res.send(patient);
});

export default router;
