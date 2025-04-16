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

    const storedRecipes = JSON.parse(localStorage.getItem("recipes") ?? "[]");
    expect(recipesStore.recipes).toStrictEqual(storedRecipes);
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

  it("should set recipes directly in store", () => {
    const mockRecipes = [
      { idMeal: "1", strMeal: "Test Recipe" },
      { idMeal: "2", strMeal: "Another Recipe" },
    ] as Recipe[];
    const recipesStore = useRecipesStore();

    recipesStore.setRecipes(mockRecipes);

    expect(recipesStore.recipes).toStrictEqual(mockRecipes);
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

  describe("Favorites functionality", () => {
    const mockRecipe = {
      idMeal: "1",
      strMeal: "Test Recipe",
    } as Recipe;

    beforeEach(() => {
      useRecipesStore().$reset();
    });

    it("should add recipe to favorites", () => {
      const store = useRecipesStore();
      vi.spyOn(store, "isInFavorites").mockReturnValue(false);
      vi.spyOn(store, "addToFavorites");

      recipeService.addOrRemoveFavorite(mockRecipe);

      expect(store.isInFavorites).toHaveBeenCalledWith(mockRecipe);
      expect(store.addToFavorites).toHaveBeenCalledWith(mockRecipe);
    });

    it("should remove recipe from favorites", () => {
      const store = useRecipesStore();
      vi.spyOn(store, "isInFavorites").mockReturnValue(true);
      vi.spyOn(store, "removeFromFavorites");

      recipeService.addOrRemoveFavorite(mockRecipe);

      expect(store.isInFavorites).toHaveBeenCalledWith(mockRecipe);
      expect(store.removeFromFavorites).toHaveBeenCalledWith(mockRecipe);
    });

    it("should check if recipe is in favorites", () => {
      const store = useRecipesStore();
      vi.spyOn(store, "isInFavorites").mockReturnValue(true);

      const result = recipeService.isInFavorites(mockRecipe);

      expect(store.isInFavorites).toHaveBeenCalledWith(mockRecipe);
      expect(result).toBe(true);
    });

    it("should reflect changes in localStorage when adding to favorites", () => {
      recipeService.addOrRemoveFavorite(mockRecipe);

      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") ?? "[]"
      );
      expect(storedFavorites).toContainEqual(mockRecipe);
    });

    it("should reflect changes in localStorage when removing from favorites", () => {
      recipeService.addOrRemoveFavorite(mockRecipe);
      recipeService.addOrRemoveFavorite(mockRecipe);

      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") ?? "[]"
      );
      expect(storedFavorites).not.toContainEqual(mockRecipe);
    });

    it("should return favourite recipes from store", () => {
      const mockRecipes = [
        { idMeal: "1", strMeal: "Chocolate Cake" },
      ] as Recipe[];
      const recipesStore = useRecipesStore();
      recipesStore.favorites = mockRecipes;

      const result = recipeService.getFavourites();

      expect(result).toStrictEqual(mockRecipes);
    });
  });
});
