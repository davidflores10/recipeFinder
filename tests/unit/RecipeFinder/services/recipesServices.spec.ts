import { beforeEach, describe, expect, it, vi } from "vitest";
import recipesRepository from "@/RecipeFinder/repository/recipesRepository";
import recipeService from "@/RecipeFinder/services/recipeService";
import { setActivePinia, createPinia } from "pinia";
import { useRecipesStore } from "@/stores/recipes";

describe("RecipeFinder/services/recipesService", () => {
  setActivePinia(createPinia());
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return recipes data", async () => {
    const RECIPE_NAME = "chocolate";
    const mockResponse = { meals: [] };
    recipesRepository.getRecipes = vi.fn().mockResolvedValue(mockResponse);

    await recipeService.getRecipes(RECIPE_NAME);
    const recipesStore = useRecipesStore();

    expect(recipesStore.recipes).toStrictEqual(mockResponse);
  });
});
