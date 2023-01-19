import Course from "./components/Course";
import Total from "./components/Total";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  const exercises = courses.map((course) => {
    return course.parts.map((part) => part.exercises);
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
        <>
          <h1>{course.name}</h1>
          {course.parts.map((parts) => (
            <Course
              key={parts.id}
              name={parts.name}
              exercises={parts.exercises}
            />
          ))}
        </>
      ))}
      <Total count={total} />
    </div>
  );
};

export default App;
