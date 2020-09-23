/**
 * Helper function for exhaustive type checking
 */

export const assertNever = (value: never): never => {
    throw new Error(
        `Unhadled discriminated union member: ${JSON.stringify(value)}`
    )
}