import recipesRepository from "@/RecipeFinder/repository/recipesRepository";
import { Recipe } from "@/RecipeFinder/models/Recipe";
import { useRecipesStore } from "@/stores/recipes";

export default {
  async getRecipes(recipeName: string) {
    const recipesStore = useRecipesStore();
    const recipes: Recipe[] = await recipesRepository.getRecipes(recipeName);
    recipesStore.recipes = recipes;
    localStorage.setItem("recipes", JSON.stringify(recipes));
  },

  getRecipesFromLocalStorage() {
    const recipesStore = useRecipesStore();
    const recipes = localStorage.getItem("recipes");
    if (recipes) {
      recipesStore.recipes = JSON.parse(recipes);
    }
  },

  getRecipesFromStore() {
    const recipesStore = useRecipesStore();
    return recipesStore.recipes;
  },

  clearRecipes() {
    const recipesStore = useRecipesStore();
    recipesStore.recipes = [];
    localStorage.removeItem("recipes");
  },

  getRecipeById(id: number) {
    const recipesStore = useRecipesStore();
    if (!recipesStore.recipes.length) {
      this.getRecipesFromLocalStorage();
    }
    const recipe = recipesStore.recipes.find(
      (recipe) => Number(recipe.idMeal) === id
    );
    return recipe;
  },

  addOrRemoveFavorite(recipe: Recipe) {
    const store = useRecipesStore();
    if (!store.isInFavorites(recipe)) {
      store.addToFavorites(recipe);
      return;
    }
    store.removeFromFavorites(recipe);
  },

  isInFavorites(recipe: Recipe) {
    const store = useRecipesStore();
    return store.isInFavorites(recipe);
  },
};
