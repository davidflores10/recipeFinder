import { Recipe } from "@/RecipeFinder/models/Recipe";
import { defineStore } from "pinia";

export const useRecipesStore = defineStore("recipesStore", {
  state: () => ({ recipes: [] as Recipe[] }),
});
