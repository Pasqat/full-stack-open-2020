import express from "express";
import bmiCalculator from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
    try {
        const dailyexercises: number[]= req.body.daily_exercises;
        const target: number = req.body.target;

        if (!dailyexercises || !target) {
            throw new Error("parameters missing");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (dailyexercises.find((n: any) => isNaN(Number(n))) || isNaN(Number(target))) {
            throw new Error("malformatted parameters");
        }

        const report = calculateExercises(target, dailyexercises);
        res.json(report);

    } catch (e) {

        res.status(400).json({ error: e.message });
    }

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
