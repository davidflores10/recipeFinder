<template>
  <div
    v-if="recipes.length"
    class="w-full mt-8 bg-[url(/src/shared/assets/img/background.png)] h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center"
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

const recipes = computed(() => recipeService.getRecipesFromStore());
</script>
