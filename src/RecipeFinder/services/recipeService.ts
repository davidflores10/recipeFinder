import recipesRepository from "@/RecipeFinder/repository/recipesRepository";
import { Recipe } from "@/RecipeFinder/models/Recipe";

export default {
  async getRecipes(recipeName: string): Promise<Recipe[]> {
    const recipes = await recipesRepository.getRecipes(recipeName);
    return recipes;
  },
};
