interface TotalProps {
  courseParts: Array<{
    name: string;
    exerciseCount: number;
  }>;
}

const Total = (props: TotalProps) => {
  return (
    <div>
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  );
};

export default Total;
