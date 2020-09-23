import React from "react";
import { assertNever } from "./utils";
import { CoursePart } from "../types";

const Part: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((part: CoursePart) => {
        switch (part.name) {
          case "Fundamentals":
            return (
              <div>
                <p key={part.name}>
                  {part.name} {part.exerciseCount}
                </p>
                <p>Description: {part.description}</p>
              </div>
            );
          case "Using props to pass data":
            return (
              <div>
                <p key={part.name}>
                  {part.name} {part.exerciseCount}
                </p>
                <p>Project Count: {part.groupProjectCount}</p>
              </div>
            );
          case "Deeper type usage":
            return (
              <div>
                <p key={part.name}>
                  {part.name} {part.exerciseCount}
                </p>
                <p>Submission link: {part.exerciseSubmissionLink}</p>
              </div>
            );
          case "A note about defining object types":
            return (
              <div>
                <p key={part.name}>
                  {part.name} {part.exerciseCount}
                </p>
                <p>Description: {part.description}</p>
              </div>
            );
          default:
            return assertNever(part);
        }
      })}
    </>
  );
};

// const Content: React.FC<{ courseParts: Array<CourseBase> }> = ({
//   courseParts,
// }) => (
//     <>
//       {courseParts.map((p: CourseBase) => (
//         <p key={p.name}>
//           {p.name} {p.exerciseCount}
//         </p>
//       ))}
//     </>
//   );

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return <Part courseParts={courseParts} />;
};
export default Content;
