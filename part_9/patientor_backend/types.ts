export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

// export type Patient = {
// 	id: string;
// 	name: string;
// 	dateOfBirth: string;
// 	gender: string;
// 	occupation: string;
// 	ssn: string;
//   };

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type PublicPatient = Pick<
  Patient,
  "id" | "name" | "dateOfBirth" | "gender" | "occupation"
>;
