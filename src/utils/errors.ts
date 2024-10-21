export const errorMessages = {
  invalidUserId: 'Invalid User ID. Please input a valid User ID.',
  invalidUserData: 'Invalid Users data',
  userNotFound: 'User with this id not exists.',
  invalidRequestBody: 'Invalid request body. Please check the JSON format and required fields.',
  internalServerError: "Internal Server Error. Please try again later",
  invalidURL: 'Invalid URL. Please input correct URL.',
  methodNotAllowed: 'Method Not Allowed',
};

export const enum statusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  notFound = 404,
  methodNotAllowed = 405,
  internalServerError = 500,
}
