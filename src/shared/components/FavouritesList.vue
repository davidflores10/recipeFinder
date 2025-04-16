<template>
  <div
    v-if="recipes.length"
    class="w-full bg-[url(/src/shared/assets/img/favourites-background.png)] h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center"
  >
    <div v-for="recipe in recipes" :key="recipe.idMeal" class="w-fit mt-8">
      <RecipeCard :recipe="recipe" />
    </div>
  </div>
</template>

<script setup lang="ts">
import recipeService from "@/RecipeFinder/services/recipeService";
import { computed } from "vue";
import RecipeCard from "./RecipeCard.vue";

const recipes = computed(() => recipeService.getFavourites());
</script>
