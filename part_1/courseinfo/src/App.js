import Course from "./components/Course";
import Total from "./components/Total";

const App = () => {
  const courses = [
    {
      name: "Web Development Fundamentals",
      id: 1,
      modules: [
        {
          name: "HTML and CSS",
          exercises: 10,
          id: 1,
        },
        {
          name: "JavaScript Basics",
          exercises: 7,
          id: 2,
        },
        {
          name: "React Fundamentals",
          exercises: 14,
          id: 3,
        },
        {
          name: "Node.js",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Data Science",
      id: 2,
      modules: [
        {
          name: "Python Fundamentals",
          exercises: 3,
          id: 1,
        },
        {
          name: "Machine Learning",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  const exercises = courses.map((course) => {
    return course.modules.map((module) => module.exercises);
  });

  const initialValue = 0;
  const count = exercises.map((x) =>
    x.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    )
  );

  const total = count.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h1>{course.name}</h1>
          {course.modules.map((module) => (
            <Course
              key={module.name}
              name={module.name}
              exercises={module.exercises}
            />
          ))}
        </div>
      ))}
      <Total count={total} />
    </div>
  );
};

export default App;
