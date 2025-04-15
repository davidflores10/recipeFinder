<template>
  <div
    class="flex flex-col justify-center bg-gray-100 flex w-full"
    v-if="recipe"
  >
    <div
      class="md:pl-16 md:pt-16 grid grid-cols-1 md:grid-cols-2 md:grid-cols-[40%_60%]"
    >
      <div class="flex justify-center items-center">
        <img class="rounded-t-lg" :src="recipe.strMealThumb" alt="" />
      </div>
      <div class="flex flex-col justify-center items-center md:items-start">
        <h1
          class="block mb-2 text-sm text-slate-600 scroll-m-20 text-4xl font-extrabold tracking-tight text-5xl sm:pl-10"
        >
          {{ recipe.strMeal }}
        </h1>
        <h2
          class="block mb-2 text-sm text-slate-600 scroll-m-20 text-4xl font-extrabold tracking-tight text-2xl sm:pl-10"
        >
          {{ recipe.strCategory }} - {{ recipe.strArea }}
        </h2>
      </div>
    </div>
    <div
      class="md:pl-16 md:pt-16 grid grid-cols-1 md:grid-cols-2 md:grid-cols-[20%_80%]"
    >
      <div
        class="border-t-2 md:border-t-0 md:border-r-2 border-[#2C6F45] md:w-fit md:pr-10"
      >
        <h1
          class="text-slate-600 text-3xl font-bold justify-center md:justify-start flex"
        >
          Ingredients
        </h1>
        <span
          v-for="ingredient in ingredientsAndMeasures"
          class="text-slate-600 md:block flex justify-center pl-2"
        >
          {{ ingredient }}
        </span>
      </div>
      <div
        class="py-5 px-5 flex flex-col justify-center items-center md:items-start border-t-2 md:border-t-0 border-[#2C6F45]"
      >
        <h1
          class="block mb-2 text-slate-600 scroll-m-20 text-3xl font-extrabold tracking-tight md:pl-10"
        >
          Instructions
        </h1>
        <p
          class="block mb-2 text-slate-600 scroll-m-20 text-xl tracking-tight md:pl-14 md:pl-10 whitespace-pre-line"
        >
          {{ recipe.strInstructions }}
        </p>
      </div>
    </div>
    <div class="grid justify-center pt-10">
      <span class="text-slate-600 text-3xl font-bold block">Video:</span>

      <iframe
        class="w-[300px] h-[240px] sm:w-[420px] sm:h-[315px] md:w-[560px] md:h-[315px] rounded-lg lg:w-[800px] lg:h-[450px]"
        :src="recipe.strYoutube.replace('watch?v=', 'embed/')"
      >
      </iframe>
    </div>
    <div class="flex justify-center px-5 break-all">
      <span
        class="block pt-16 mb-2 text-slate-600 scroll-m-20 text-2xl font-extrabold tracking-tight text-2xl sm:pl-10"
        >Full recipe:
        <a
          class="hover:text-slate-600 text-[#2C6F45]"
          :href="recipe.strSource"
          >{{ recipe.strSource }}</a
        ></span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import recipeService from "@/RecipeFinder/services/recipeService";
import type { Recipe } from "@/RecipeFinder/models/Recipe";

const recipe = ref<Recipe | undefined>();
const ingredientsAndMeasures = ref<string[]>([]);

const props = defineProps<{
  id: number;
}>();

onMounted(() => {
  recipe.value = recipeService.getRecipeById(props.id);

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe.value?.[`strIngredient${i}` as keyof Recipe];
    const measure = recipe.value?.[`strMeasure${i}` as keyof Recipe];

    if (ingredient && ingredient.trim() !== "") {
      ingredientsAndMeasures.value.push(`${ingredient}: ${measure} `);
    }
  }
});
</script>
