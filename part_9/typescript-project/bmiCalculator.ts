const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  switch (true) {
    case bmi < 16.5:
      return "Underweight (Severe thinness)";
    case bmi < 18.5 && bmi >= 16.5:
      return "Underweight (Moderate thinness)";
    case bmi < 25 && bmi >= 18.5:
      return "Normal (healthy weight)";
    case bmi < 30 && bmi >= 25:
      return "Overweight (Pre-obese)";
    case bmi < 35 && bmi >= 30:
      return "Obese Class I (Moderately obese)";
    case bmi < 40 && bmi >= 35:
      return "Obese Class II (Severely obese)";
    case bmi >= 40:
      return "Obese Class III (Very severely obese)";
    default:
      return "Something went wrong";
  }
};

console.log(calculateBmi(180, 74));
