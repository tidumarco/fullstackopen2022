const Course = ({ name, exercises, id }) => {
  return (
    <li key={id}>
      {name}: {exercises} exercises
    </li>
  );
};

export default Course;
