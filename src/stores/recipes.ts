import { defineStore } from "pinia";
import { Recipe } from "@/RecipeFinder/models/Recipe";
import { ref } from "vue";

export const useRecipesStore = defineStore("recipes", () => {
  const recipes = ref<Recipe[]>([]);
  const favorites = ref<Recipe[]>(
    JSON.parse(localStorage.getItem("favorites") ?? "[]")
  );

  function setRecipes(newRecipes: Recipe[]) {
    recipes.value = newRecipes;
  }

  function addToFavorites(recipe: Recipe) {
    favorites.value.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  }

  function removeFromFavorites(recipe: Recipe) {
    favorites.value = favorites.value.filter(
      (fav) => fav.idMeal !== recipe.idMeal
    );
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  }

  function isInFavorites(recipe: Recipe) {
    return favorites.value.some((fav) => fav.idMeal === recipe.idMeal);
  }

  function $reset() {
    recipes.value = [];
    favorites.value = [];
    localStorage.removeItem("favorites");
  }

  return {
    recipes,
    favorites,
    setRecipes,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    $reset,
  };
});
