function calculateBMI(height: number, weight: number): string {
  const BMI = weight / ((height / 100) ** 2);

  if (BMI <= 15) {
    return "Very severly underweight";
  } else if (BMI > 15 && BMI <= 16) {
    return "Severely underweight";
  } else if (BMI > 16 && BMI <= 18.5) {
    return "Underweight";
  } else if (BMI > 18.5 && BMI <= 25) {
    return "Normal (healthy weight)"
  } else if (BMI > 25 && BMI <= 30) {
    return " Overweight"
  } else {
    return "Obese"
  }
}
console.log(calculateBMI(180, 74))


