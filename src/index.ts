import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calc } from "./exerciseCalculator";
import { patientsData } from "./patients";
import cors from "cors";
import toNewPatient from "./utils";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({
      weight,
      height,
      bmi,
    });
  } else {
    res.send({
      error: "malformatted parameters",
    });
  }
});

app.get("/api/patients", (_req, res) => {
  res.send(
    patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }))
  );
});

app.post("/api/patients", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    patientsData.push(newPatient); // Add the new patient to the data array
    res.json(newPatient);
  } catch (e) {
    res.status(400).send("Error");
  }
});


app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.send({
      error: "parameters missing",
    });
  } else if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    res.send({
      error: "malformatted parameters",
    });
  } else {
    res.send(calc(daily_exercises as number[], Number(target)));
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
