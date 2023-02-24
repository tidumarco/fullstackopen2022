interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  daily_exercises: Array<number>,
  target: number
): Result => {
  const total = daily_exercises.reduce((a, b) => a + b);
  const average = total / daily_exercises.length;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
