interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  daily_exercises: Array<number>,
  target: number
): Result => {
  //   const total = daily_exercises.reduce((a, b) => a + b);
  const average =
    daily_exercises.reduce((a, b) => a + b, 0) / daily_exercises.length;
  const success = average >= target;
  let rating;
  let ratingDescription;
  if (success) {
    rating = 3;
    ratingDescription = "great job!";
  } else if (average / target >= 0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "need to work harder";
  }
  return {
    periodLength: daily_exercises.length,
    trainingDays: daily_exercises.filter((day) => day > 0).length,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export const parseArgumentsTwo = (
  args: Array<string>
): { dailyExercises: Array<number>; target: number } => {
//   if (args.length < 4) throw new Error("Not enough arguments");

  const dailyExercises = args.slice(2, args.length - 1).map((arg) => {
    const exercise = Number(arg);
    if (isNaN(exercise)) throw new Error("Provided values were not numbers!");
    return exercise;
  });

  const target = Number(args[args.length - 1]);
//   if (isNaN(target)) throw new Error("Provided target value is not a number!");
  return {
    dailyExercises,
    target,
  };
};

// try {
//   const { dailyExercises, target } = parseArgumentsTwo(process.argv);
//   console.log(calculateExercises(dailyExercises, target));
// } catch (e) {
//   console.log("Error:", e.message);
// }
