export interface CourseBase {
    name: string;
    exerciseCount: number;
}

interface CourseBaseDescription extends CourseBase {
    description: string;
}

export interface CoursePartOne extends CourseBaseDescription {
    name: "Fundamentals";
}

export interface CoursePartTwo extends CourseBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

export interface CoursePartThree extends CourseBaseDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseBaseDescription {
    name: "A note about defining object types";
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;