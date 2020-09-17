import express from "express";
import bmiCalculator from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi: string = bmiCalculator(height, weight);

  try {
    if (!isNaN(height) && !isNaN(weight)) {
    res.send({
      height,
      weight,
      bmi,
    });
    } else {
      throw new Error("malformatted parameters");
    }
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
