import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, parseArgumentsTwo } from "./exerciseCalculator";

const app = express();

app.use(express.json())

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      throw new Error("malformatted parameters");
    }

    const bmi = calculateBmi(height, weight);
    console.log(bmi);

    res.json({
      weight: req.query.weight,
      height: req.query.height,
      bmi: bmi,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = req.body as any;
    // We need to make sure that both properties of the request body exist and are numbers or parsable to numbers, else we throw an error
    if (!body.daily_exercises || !body.target) {
      res.status(400).json({
        error: "parameters missing",
      });
      return;
    } else if (
      typeof body.daily_exercises !== "object" ||
      typeof body.target !== "number"
    ) {
      res.status(400).json({
        error: "malformatted parameters",
      });
      return;
    }

    // We now try to parse arguments into multiply values
    const { dailyExercises, target } = parseArgumentsTwo([
      ...body.daily_exercises,
      body.target,
    ]);

    const result = calculateExercises(dailyExercises, target);
    res.send(result);
  } catch (err) {
    // Handle the errors properly
    res.status(400).json({
      error: err.message,
    });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
