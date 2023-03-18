import express from "express";
import data from "./data/diagnoses";
import data2 from "./data/patients";
import { PublicPatient, Patient } from "./types";
import { v1 as uuid } from "uuid";

const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());

const PORT = 3001;

app.get("/api/diagnoses", (_, res) => {
  res.json(data);
});

app.get("/api/patients", (_req, res) => {
  const publicPatients: PublicPatient[] = data2.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries: [],
    })
  );

  res.json(publicPatients);
});

app.post("/api/patients", (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation }: Patient = req.body;

    const newPatient = {
      id: uuid(),
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries: [],
    };

    data2.push(newPatient); // adds new patient to data2 array

    res.status(201).json(newPatient); // returns the newly created patient with status code 201
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

app.get("/api/patients/:id", (req, res) => {
  const id = req.params.id;
  const patient = data2.find((p) => p.id === id);
  if (!patient) {
    res.status(404).send("Patient not found");
  } else {
    res.send(patient);
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
