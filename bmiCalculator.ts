interface BMIValues {
  height_cm: number;
  weight_kg: number;
}

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height_cm: Number(args[2]),
      weight_kg: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (weight_kg: number, height_cm: number): string => {
  const bmi = (weight_kg / (height_cm * height_cm)) * 10000;
  if (bmi < 18.5) {
    return "Underweight (unhealthy weight)";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight (unhealthy weight)";
  }
  return "Obese (unhealthy weight)";
};

try {
  const { height_cm, weight_kg } = parseArguments(process.argv);
  console.log(calculateBmi(weight_kg, height_cm));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}
