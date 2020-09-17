import express from 'express';
import bmiCalculator from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
})

app.get('/bmi', (req, res) => {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);
    const bmi: string = bmiCalculator(height, weight)

    try {
        if (!isNaN(height) && !isNaN(weight)) {

        } else {
            throw new Error('malformatted parameters')
        }
        res.send({
            height,
            weight,
            bmi
        })

    } catch (e) {
        res.status(400).send(e.message)
    }
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})