import React from "react";
import { CoursePart } from "../App";

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
          <p>{part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
