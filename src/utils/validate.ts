export const isValidUser = (username: string, age: number, hobbies: Array<string>): boolean => {
  return (
    typeof username === 'string' &&
    typeof age === 'number' &&
    Array.isArray(hobbies) &&
    hobbies.every((hobby) => typeof hobby ==='string')
  );
}
