import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Patient } from "../types";

const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/patients/${id}`).then((response) => {
      setPatient(response.data);
    });
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>; // add loading indication
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of birth: {patient.dateOfBirth}</p>
      {/* <h3>Entries</h3>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <p>Date: {entry.date}</p>
          <p>Description: {entry.description}</p>
        </div>
      ))} */}
    </div>
  );
};

export default PatientInfo;
