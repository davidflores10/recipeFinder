import { ErrorCodes } from "@/shared/support/constants/errorCodes";
import {
  unauthorizedError,
  forbiddenError,
  recurseError,
  undefinedError,
  notFoundError,
} from "@/shared/support/constants/exceptions";

const getExceptionFromHttpError = (httpStatus: ErrorCodes) => {
  if (httpStatus === ErrorCodes.UNAUTHORIZED) {
    return unauthorizedError;
  }
  if (httpStatus === ErrorCodes.FORBIDDEN) {
    return forbiddenError;
  }
  if (httpStatus === ErrorCodes.RECURSE_ERROR) {
    return recurseError;
  }
  if (httpStatus === ErrorCodes.NOT_FOUND) {
    return notFoundError;
  }
  return undefinedError;
};

export { getExceptionFromHttpError };
