interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

function nonZero(arr: Array<number>): number {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        arr[i] !== 0 ? count++ : count
    }
    return count;

}

function checkTarget(arr: Array<number>, targetDailyHours: number) {
    return arr.every(a => a >= targetDailyHours);
}

function calcAverage(arr: Array<number>): number {
    return arr.reduce((a: number, c: number) => a + c) / arr.length;
}

function checkRating(target: number, average: number, success: boolean): number {

    if (average === 0) {
        return 1;
    } else if (average > 0 && !success) {
        return 2;
    } else if ((average > target && !success) || success) {
        return 3;
    }
}

function ratingDesc(rating: number): string {
    switch (rating) {
        case 1:
            return "next week you will do better";
        case 2:
            return "not too bad but could be better";
        case 3:
            return "you are doing great! 💪";
    }
}

const calculateExercises = function (exercises: Array<number>, targetDailyHours: number): Result {
    const periodLength = exercises.length;
    const trainingDays = nonZero(exercises);
    const success = checkTarget(exercises, targetDailyHours);
    const average = calcAverage(exercises);
    const rating = checkRating(targetDailyHours, average, success)
    const ratingDescription = ratingDesc(rating)

    const result = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetDailyHours,
        average,
    }

    console.table(result)
    return result
}

calculateExercises([0, 2, 9, 3, 0, 0, 1], 2)
calculateExercises([4, 2, 9, 3, 3, 5, 2], 2)
