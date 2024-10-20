export const errorMessages = {
  notFound: "Not found",
  invalidUserId: "Invalid user ID",
  invalidUserData: "Invalid users data",
  userNotFound: "User not found",
  invalidRequestBody: "Invalid request body. Please check the JSON format and required fields.",
  invalidBody: "Invalid JSON format in request body",
  internalServerError: "Internal Server Error. Please try again later",
  methodNotAllowed: "Method Not Allowed",
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
