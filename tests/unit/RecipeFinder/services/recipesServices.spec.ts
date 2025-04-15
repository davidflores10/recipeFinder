import { beforeEach, describe, expect, it, vi } from "vitest";
import recipesRepository from "@/RecipeFinder/repository/recipesRepository";
import recipeService from "@/RecipeFinder/services/recipeService";
import { setActivePinia, createPinia } from "pinia";
import { useRecipesStore } from "@/stores/recipes";
import type { Recipe } from "@/RecipeFinder/models/Recipe";

describe("RecipeFinder/services/recipesService", () => {
  setActivePinia(createPinia());

  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it("should fetch and store recipes data", async () => {
    const RECIPE_NAME = "chocolate";
    const mockRecipes = [
      { idMeal: "1", strMeal: "Chocolate Cake" },
    ] as Recipe[];
    recipesRepository.getRecipes = vi.fn().mockResolvedValue(mockRecipes);
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    await recipeService.getRecipes(RECIPE_NAME);
    const recipesStore = useRecipesStore();

    expect(recipesStore.recipes).toStrictEqual(mockRecipes);
    expect(setItemSpy).toHaveBeenCalledWith(
      "recipes",
      JSON.stringify(mockRecipes)
    );
  });

  it("should handle error when fetching recipes fails", async () => {
    const RECIPE_NAME = "chocolate";
    const mockError = new Error("Failed to fetch");
    const recipesStore = useRecipesStore();
    recipesRepository.getRecipes = vi.fn().mockRejectedValue(mockError);

    // Initialize store with some data to ensure it's reset on error
    recipesStore.recipes = [
      { idMeal: "1", strMeal: "Initial Recipe" },
    ] as Recipe[];

    await expect(recipeService.getRecipes(RECIPE_NAME)).rejects.toThrow(
      "Failed to fetch"
    );
    expect(recipesStore.recipes).toEqual([
      { idMeal: "1", strMeal: "Initial Recipe" },
    ]);
    expect(localStorage.getItem("recipes")).toBe(null);
  });

  it("should load recipes from localStorage to store", () => {
    const mockRecipes = [
      { idMeal: "1", strMeal: "Chocolate Cake" },
    ] as Recipe[];
    localStorage.setItem("recipes", JSON.stringify(mockRecipes));

    recipeService.getRecipesFromLocalStorage();
    const recipesStore = useRecipesStore();

    expect(recipesStore.recipes).toStrictEqual(mockRecipes);
  });

  it("should return recipes from store", () => {
    const mockRecipes = [
      { idMeal: "1", strMeal: "Chocolate Cake" },
    ] as Recipe[];
    const recipesStore = useRecipesStore();
    recipesStore.recipes = mockRecipes;

    const result = recipeService.getRecipesFromStore();

    expect(result).toStrictEqual(mockRecipes);
  });

  it("should clear recipes from store and localStorage", () => {
    const mockRecipes = [
      { idMeal: "1", strMeal: "Chocolate Cake" },
    ] as Recipe[];
    const recipesStore = useRecipesStore();
    recipesStore.recipes = mockRecipes;
    localStorage.setItem("recipes", JSON.stringify(mockRecipes));
    const removeItemSpy = vi.spyOn(Storage.prototype, "removeItem");

    recipeService.clearRecipes();

    expect(recipesStore.recipes).toStrictEqual([]);
    expect(removeItemSpy).toHaveBeenCalledWith("recipes");
  });

  describe("getRecipeById", () => {
    it("should return recipe by id from store", () => {
      const mockRecipes = [
        { idMeal: "1", strMeal: "Chocolate Cake" },
        { idMeal: "2", strMeal: "Vanilla Cake" },
      ] as Recipe[];
      const recipesStore = useRecipesStore();
      recipesStore.recipes = mockRecipes;

      const result = recipeService.getRecipeById(1);

      expect(result).toStrictEqual(mockRecipes[0]);
    });

    it("should load recipes from localStorage if store is empty", () => {
      const mockRecipes = [
        { idMeal: "1", strMeal: "Chocolate Cake" },
        { idMeal: "2", strMeal: "Vanilla Cake" },
      ] as Recipe[];
      localStorage.setItem("recipes", JSON.stringify(mockRecipes));
      const recipesStore = useRecipesStore();
      recipesStore.recipes = [];

      const result = recipeService.getRecipeById(1);

      expect(result).toStrictEqual(mockRecipes[0]);
    });

    it("should return undefined if recipe not found", () => {
      const mockRecipes = [
        { idMeal: "1", strMeal: "Chocolate Cake" },
      ] as Recipe[];
      const recipesStore = useRecipesStore();
      recipesStore.recipes = mockRecipes;

      const result = recipeService.getRecipeById(2);

      expect(result).toBeUndefined();
    });
  });
});
