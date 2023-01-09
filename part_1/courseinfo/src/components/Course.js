const Course = ({ name, exercises, key }) => {
  return (
    <li key={key}>
      {name}: {exercises} exercises
    </li>
  );
};

export default Course;
