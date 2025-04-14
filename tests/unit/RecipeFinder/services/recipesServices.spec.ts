import { beforeEach, describe, expect, it, vi } from "vitest";
import recipesRepository from "@/RecipeFinder/repository/recipesRepository";
import recipeService from "@/RecipeFinder/services/recipeService";

describe("RecipeFinder/services/recipesService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return recipes data", async () => {
    const RECIPE_NAME = "chocolate";
    const mockResponse = { meals: [] };
    recipesRepository.getRecipes = vi.fn().mockResolvedValue(mockResponse);

    const result = await recipeService.getRecipes(RECIPE_NAME);

    expect(result).toBe(mockResponse);
  });
});
