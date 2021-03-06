interface MultiplyValues2 {
    targetValue: number;
    values: Array<number>;
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parser = (arg: string[]): MultiplyValues2 => {
    if (arg.length < 4) throw new Error("Not enough arguments");
    arg.shift();
    arg.shift();

    if (arg.every((a) => !isNaN(Number(a)))) {
        const values = arg.map((a) => Number(a));
        values.shift();
        const newObject = { targetValue: Number(arg[0]), values };
        return newObject;
    } else {
        throw new Error("Provided value were not numbers");
    }
};

function nonZero(arr: Array<number>): number {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        arr[i] !== 0 ? count++ : count;
    }
    return count;
}

function checkTarget(arr: Array<number>, targetDailyHours: number) {
    return arr.every((a) => a >= targetDailyHours);
}

function calcAverage(arr: Array<number>): number {
    return arr.reduce((a: number, c: number) => a + c) / arr.length;
}

function checkRating(
    target: number,
    average: number,
    success: boolean
): number {

    let rating = 0;

    if (average === 0) {
        rating =  1;
    } else if (average > 0 && !success) {
        rating = 2;
    } else if ((average > target && !success) || success) {
        rating = 3;
    }

    return rating;
}

function ratingDesc(rating: number): string {
    let desc = '';
    switch (rating) {
        case 1:
            desc = "next week you will do better";
            break;
        case 2:
            desc = "not too bad but could be better";
            break;
        case 3:
            desc = "you are doing great! 💪";
            break;
    }
    return desc;
}

export const calculateExercises = function (
    targetDailyHours: number,
    exercises: Array<number>
): Result {
    const periodLength = exercises.length;
    const trainingDays = nonZero(exercises);
    const success = checkTarget(exercises, targetDailyHours);
    const average = calcAverage(exercises);
    const rating = checkRating(targetDailyHours, average, success);
    const ratingDescription = ratingDesc(rating);

    const result = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetDailyHours,
        average,
    };

    console.table(result);
    return result;
};

try {
    const { targetValue, values } = parser(process.argv);
    calculateExercises(targetValue, values);
} catch (e) {
    console.log(`Error, message:  ${e.message}`);
}
