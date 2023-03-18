interface ContentProps {
  courseParts: Array<{
    name: string;
    exerciseCount: number;
  }>;
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <li>
          {part.name} {part.exerciseCount}
        </li>
      ))}
    </div>
  );
};

export default Content;