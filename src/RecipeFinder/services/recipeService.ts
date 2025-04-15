import recipesRepository from "@/RecipeFinder/repository/recipesRepository";
import { Recipe } from "@/RecipeFinder/models/Recipe";
import { useRecipesStore } from "@/stores/recipes";

export default {
  async getRecipes(recipeName: string) {
    const recipesStore = useRecipesStore();
    const recipes: Recipe[] = await recipesRepository.getRecipes(recipeName);
    recipesStore.recipes = recipes;
  },

  getRecipesFromStore() {
    const recipesStore = useRecipesStore();
    return recipesStore.recipes;
  },
};
