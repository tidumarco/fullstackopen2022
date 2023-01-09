const Content = (props) => {
  return (
    <>
      <p>
        {props.parts[0].name} {props.parts[0].exercises}
		<br/>
		{props.parts[1].name} {props.parts[1].exercises}
		<br/>
		{props.parts[2].name} {props.parts[2].exercises}
      </p>
    </>
  );
};

export default Content;
