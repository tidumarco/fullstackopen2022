export interface Entry {}

export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type PublicPatient = Pick<
  Patient,
  "id" | "name" | "dateOfBirth" | "gender" | "occupation" | "entries"
>;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
