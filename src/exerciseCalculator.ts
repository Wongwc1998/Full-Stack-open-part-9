type Result = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

export const calc = (array_input: Array<number>, target: number): Result => {
  const average = array_input.reduce((a, b) => a + b, 0) / array_input.length;
  let rating: number;
  let ratingDescription: string;

  if (average < target) {
    rating = 1;
    ratingDescription = "bad";
  } else if (average === target) {
    rating = 2;
    ratingDescription = "good";
  } else {
    rating = 3;
    ratingDescription = "excellent";
  }

  return {
    periodLength: array_input.length,
    trainingDays: array_input.map((x) => x > 0).filter(Boolean).length,
    average: average,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
  };
};

const parseArgumentsBMI = (
  args: Array<string>
): { input_vals: Array<number>; target: number } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  const input_vals = args.slice(3).map((x) => Number(x));

  if (!isNaN(target) && input_vals.every((x) => !isNaN(x))) {
    return {
      input_vals: input_vals,
      target: target,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { input_vals, target } = parseArgumentsBMI(process.argv);
  console.log(calc(input_vals, target));
} catch (e) {
  console.log("Error, something bad happened, message");
}
