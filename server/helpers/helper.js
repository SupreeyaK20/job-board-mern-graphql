import { GraphQLError } from "graphql";

export function convertToISO(date) {
  return date.slice(0, "YYYY-MM-DD".length);
}

export function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
}

export function unauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: { code: "UNAUTHORIZED" },
  });
}
