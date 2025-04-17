<template>
  <div
    class="flex h-[450px] overflow-hidden bg-grey_card-50 m-3 rounded-lg min-w-80 hover:scale-[1.05] hover:translate-y-[-5px] hover:shadow-2xl cursor-pointer"
    @click="goToRecipe"
  >
    <div
      class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-[#2C6F45]"
    >
      <font-awesome-icon
        v-if="isFavorite"
        :icon="['fas', 'heart']"
        class="absolute right-2 top-2 h-12 z-[1] text-[#F6415E]"
        @click="addToFavorites($event, recipe)"
      />
      <font-awesome-icon
        v-else
        :icon="['far', 'heart']"
        class="absolute right-2 top-2 h-12 z-[1] text-[#F6415E]"
        @click="addToFavorites($event, recipe)"
      />

      <a>
        <img
          class="rounded-t-lg max-w-[300px] 2xl:max-w-[320px]"
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import recipeService from "@/RecipeFinder/services/recipeService";
import { computed } from "vue";

const router = useRouter();
const props = defineProps<{
  recipe: Recipe;
}>();

const isFavorite = computed(() => recipeService.isInFavorites(props.recipe));

const goToRecipe = () => {
  router.push({ name: "recipe", params: { id: props.recipe.idMeal } });
};

const addToFavorites = (event: Event, recipe: Recipe) => {
  event.stopPropagation();
  recipeService.addOrRemoveFavorite(recipe);
};
</script>
