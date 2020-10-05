import {HealthCheckRating} from '../types';

export const healtCheckColor = (healthCheckRating: HealthCheckRating) => {
  switch (healthCheckRating) {
    case 0:
      return "green";
    case 1:
      return "teal";
    case 2:
      return "yellow";
    case 3:
      return "red";
    default:
      return "black";
  }
};


export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
