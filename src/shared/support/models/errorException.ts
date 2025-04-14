import type { ErrorCodes } from "@/shared/support/constants/errorCodes";

export interface ErrorException {
  code: ErrorCodes;
  message: string;
}
