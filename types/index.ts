export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: "male" | "female" | "other";
  occupation: string;
};
