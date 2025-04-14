<template>
  <button @click="searchRecipe('carbonara')">hello</button>
</template>

<script setup lang="ts">
import recipesRepository from "@/RecipeFinder/repository/recipesRepository.ts";

const searchRecipe = async (recipeName: string) => {
  try {
    const response = await recipesRepository.getRecipes(recipeName);
    console.log(response);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
