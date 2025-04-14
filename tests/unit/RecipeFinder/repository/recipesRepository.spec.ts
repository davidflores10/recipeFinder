import { beforeEach, describe, expect, it, vi } from "vitest";
import http from "@/shared/support/constants/http";
import apiEndpoints from "@/shared/support/constants/apiEndpoints";
import recipesRepository from "@/RecipeFinder/repository/recipesRepository";
import type { AxiosError } from "axios";

describe("RecipeFinder/repository/recipesRepository", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should make request with recipe name and return data on success", async () => {
    const RECIPE_NAME = "chocolate";
    const mockResponse = { data: { meals: [] } };
    http.get = vi.fn().mockResolvedValue(mockResponse);

    const result = await recipesRepository.getRecipes(RECIPE_NAME);

    expect(http.get).toHaveBeenCalledWith(
      `${apiEndpoints.searchRecipe}?s=${RECIPE_NAME}`
    );
    expect(result).toBe(mockResponse.data);
  });

  it("should throw exception when request fails", async () => {
    const RECIPE_NAME = "chocolate";
    const mockError: Partial<AxiosError> = {
      response: { status: 404 } as any
    };
    http.get = vi.fn().mockRejectedValue(mockError);

    await expect(recipesRepository.getRecipes(RECIPE_NAME)).rejects.toThrow();
  });

  it("should throw undefined error when status is missing", async () => {
    const RECIPE_NAME = "chocolate";
    const mockError = new Error("Network Error");
    http.get = vi.fn().mockRejectedValue(mockError);

    await expect(recipesRepository.getRecipes(RECIPE_NAME)).rejects.toThrow();
  });
});
