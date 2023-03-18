import { Patient, Gender, Entry } from "./types";

const toNewPatient = (object: any): Patient => {
  const newPatient: Patient = {
    id: parseString(object.id),
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: parseEntries(object.entries),
  };

  return {
    id: newPatient.id,
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    ssn: newPatient.ssn,
    gender: newPatient.gender,
    occupation: newPatient.occupation,
    entries: newPatient.entries,
  };
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing string");
  }

  return text.trim();
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

const isEntries = (entries: any): entries is Entry[] => {
  return Array.isArray(entries);
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !isEntries(entries)) {
    throw new Error("Incorrect or missing entries");
  }
  return entries;
};

export default toNewPatient;
