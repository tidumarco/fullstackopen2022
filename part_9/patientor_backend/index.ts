import express from "express";
import data from "./data/diagnoses";
import data2 from "./data/patients";
import { PublicPatient } from "./types";
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

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
    })
  );

  res.json(publicPatients);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
