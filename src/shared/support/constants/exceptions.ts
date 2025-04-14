import type { ErrorException } from "@/shared/support/models/errorException";
import { ErrorCodes } from "@/shared/support/constants/errorCodes";

const unauthorizedError: ErrorException = {
  code: ErrorCodes.UNAUTHORIZED,
  message: "",
};
const forbiddenError: ErrorException = {
  code: ErrorCodes.FORBIDDEN,
  message: "",
};
const recurseError: ErrorException = {
  code: ErrorCodes.RECURSE_ERROR,
  message: "",
};
const notFoundError: ErrorException = {
  code: ErrorCodes.NOT_FOUND,
  message: "",
};
const undefinedError: ErrorException = {
  code: ErrorCodes.UNDEFINED_ERROR,
  message: "",
};

export {
  unauthorizedError,
  forbiddenError,
  recurseError,
  undefinedError,
  notFoundError,
};
