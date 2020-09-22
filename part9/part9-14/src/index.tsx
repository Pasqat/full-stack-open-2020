import React from "react";
import ReactDOM from "react-dom";

interface CourseParts {
  name: string;
  exerciseCount: number;
}

const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Content: React.FC<{ courseParts: Array<CourseParts> }> = ({
  courseParts,
}) => (
    <>
      {courseParts.map((p: CourseParts) => (
        <p key={p.name}>
          {p.name} {p.exerciseCount}
        </p>
      ))}
    </>
  );

const Total: React.FC<{ courseParts: CourseParts[]}> = ({ courseParts }) => (
  <>
    <p>
      Number of exercises{" "}
    </p>
    {courseParts.reduce((carry: number, part) => carry + part.exerciseCount, 0)}
  </>
)

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: Array<CourseParts> = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
