<template>
  <div
    class="flex h-[450px] overflow-hidden bg-grey_card-50 m-3 rounded-lg min-w-80 hover:scale-[1.05] hover:translate-y-[-5px] hover:shadow-2xl cursor-pointer"
    @click="goToRecipe"
  >
    <div
      class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-[#2C6F45]"
    >
      <a>
        <img
          class="rounded-t-lg max-w-[320px]"
          :src="recipe.strMealThumb"
          alt=""
        />
      </a>
      <div class="p-5">
        <a>
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ recipe.strMeal }}
          </h5>
        </a>
        <p class="mb-3 text-gray-700 dark:text-gray-300 font-bold">
          {{ recipe.strCategory }} - {{ recipe.strArea }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Recipe } from "@/RecipeFinder/models/Recipe";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps<{
  recipe: Recipe;
}>();

const goToRecipe = () => {
  router.push({ name: "recipe", params: { id: props.recipe.idMeal } });
};
</script>
