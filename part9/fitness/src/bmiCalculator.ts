interface MultiplyValues {
  value1: number;
  value2: number;
}
const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length !== 4) throw new Error("Accepted only 2 arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided value were not numbers");
  }
};

function calculateBMI(height: number, weight: number): string {
  const BMI: number = weight / (height / 100) ** 2;

  if (BMI <= 15) {
    return "Very severly underweight";
  } else if (BMI > 15 && BMI <= 16) {
    return "Severely underweight";
  } else if (BMI > 16 && BMI <= 18.5) {
    return "Underweight";
  } else if (BMI > 18.5 && BMI <= 25) {
    return "Normal (healthy weight)";
  } else if (BMI > 25 && BMI <= 30) {
    return " Overweight";
  } else {
    return "Obese";
  }
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  const result: string = calculateBMI(value1, value2);
  console.log(result);
} catch (e) {
  console.log("Error, something went wrong, message: " + e.message);
}

export default calculateBMI;
