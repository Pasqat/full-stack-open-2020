import React from 'react';
import { CourseParts } from '../types';

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

export default Content;