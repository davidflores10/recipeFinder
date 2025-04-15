<template>
  <div class="flex flex-col items-center justify-center bg-gray-100">
    <img
      class="max-w-xs pt-8"
      src="@/shared/assets/img/recipe-finder.png"
      alt=""
    />
    <div class="w-full min-w-[200px] relative mt-4 flex justify-center">
      <label
        class="block mb-2 text-sm text-slate-600 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        ¡Your next chef's kiss dish!
      </label>
    </div>
    <div class="w-full max-w-sm min-w-[200px] relative mt-4">
      <div class="relative">
        <input
          v-model="recipeName"
          type="email"
          class="w-full bg-green placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Enter your text"
          @keyup.enter="searchRecipe()"
        />
        <button
          class="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          @click="searchRecipe()"
        >
          Search
        </button>
      </div>
    </div>
    <RecipeList></RecipeList>
  </div>
</template>

<script setup lang="ts">
import recipeService from "@/RecipeFinder/services/recipeService";
import RecipeList from "@/shared/components/RecipeList.vue";
import { ref } from "vue";

const recipeName = ref("");

const searchRecipe = async () => {
  try {
    console.log(recipeName.value);
    await recipeService.getRecipes(recipeName.value);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};
</script>
