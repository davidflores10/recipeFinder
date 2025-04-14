import http from "@/shared/support/constants/http";
import apiEndpoints from "@/shared/support/constants/apiEndpoints";
import { getExceptionFromHttpError } from "@/shared/helpers/exceptionFactory";
import { ErrorCodes } from "@/shared/support/constants/errorCodes";
import { Recipe } from "@/RecipeFinder/models/Recipe";

import type { AxiosError } from "axios";

const getRecipes = async (recipeName: string): Promise<Recipe[]> => {
  try {
    const response = await http.get(
      `${apiEndpoints.searchRecipe}?s=${recipeName}`
    );
    return response.data;
  } catch (error) {
    const errorAxios = error as AxiosError;
    throw getExceptionFromHttpError(
      errorAxios?.response?.status
        ? errorAxios.response.status
        : ErrorCodes.UNDEFINED_ERROR
    );
  }
};

export default {
  getRecipes,
};
