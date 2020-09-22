import React from 'react';
import { CourseParts } from '../types';

const Total: React.FC<{ courseParts: CourseParts[]}> = ({ courseParts }) => (
  <>
    <p>
      Number of exercises{" "}
    </p>
    {courseParts.reduce((carry: number, part) => carry + part.exerciseCount, 0)}
  </>
)

export default Total;