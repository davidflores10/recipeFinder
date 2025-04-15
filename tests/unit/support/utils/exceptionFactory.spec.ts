import { describe, expect, it } from "vitest";
import { ErrorCodes } from "@/shared/support/constants/errorCodes";
import * as exceptionFactory from "@/shared/helpers/exceptionFactory";
import {
  unauthorizedError,
  forbiddenError,
  recurseError,
  undefinedError,
  notFoundError,
} from "@/shared/support/constants/exceptions";

describe("shared/helpers/exceptionFactory", () => {
  it("should return unauthorizedError", () => {
    expect(
      exceptionFactory.getExceptionFromHttpError(ErrorCodes.UNAUTHORIZED)
    ).toBe(unauthorizedError);
  });

  it("should return forbiddenError", () => {
    expect(
      exceptionFactory.getExceptionFromHttpError(ErrorCodes.FORBIDDEN)
    ).toBe(forbiddenError);
  });

  it("should return recurseError", () => {
    expect(
      exceptionFactory.getExceptionFromHttpError(ErrorCodes.RECURSE_ERROR)
    ).toBe(recurseError);
  });

  it("should return notFoundError", () => {
    expect(
      exceptionFactory.getExceptionFromHttpError(ErrorCodes.NOT_FOUND)
    ).toBe(notFoundError);
  });

  it("should return undefinedError", () => {
    expect(
      exceptionFactory.getExceptionFromHttpError(ErrorCodes.UNDEFINED_ERROR)
    ).toBe(undefinedError);
  });
});
