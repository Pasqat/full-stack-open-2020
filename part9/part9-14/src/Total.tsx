import React from 'react';
import { CoursePart } from '../types';

const Total: React.FC<{ courseParts: CoursePart[]}> = ({ courseParts }) => (
  <>
    <p>
      Number of exercises{" "}
    </p>
    {courseParts.reduce((carry: number, part) => carry + part.exerciseCount, 0)}
  </>
)

export default Total;