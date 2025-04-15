import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Recipe from "@/RecipeFinder/Views/Recipe.vue";
import recipeService from "@/RecipeFinder/services/recipeService";
import { setActivePinia, createPinia } from "pinia";
import type { Recipe as RecipeType } from "@/RecipeFinder/models/Recipe";

vi.mock("@/RecipeFinder/services/recipeService");

describe("Recipe.vue", () => {
  setActivePinia(createPinia());

  const mockRecipe: RecipeType = {
    idMeal: "1",
    strMeal: "Test Recipe",
    strMealAlternate: null,
    strCategory: "Test Category",
    strArea: "Test Area",
    strInstructions: "Test Instructions",
    strMealThumb: "test-image.jpg",
    strTags: "Test",
    strYoutube: "https://www.youtube.com/watch?v=123456",
    strSource: "https://test-source.com",
    strIngredient1: "Ingredient 1",
    strIngredient2: "Ingredient 2",
    strIngredient3: "",
    strMeasure1: "1 cup",
    strMeasure2: "2 tbsp",
    strMeasure3: "",
  } as RecipeType;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and display recipe details on mount", async () => {
    vi.spyOn(recipeService, "getRecipeById").mockReturnValue(mockRecipe);

    const wrapper = mount(Recipe, {
      props: {
        id: 1,
      },
    });

    await wrapper.vm.$nextTick();

    expect(recipeService.getRecipeById).toHaveBeenCalledWith(1);
    expect(wrapper.text()).toContain("Test Recipe");
    expect(wrapper.text()).toContain("Test Category - Test Area");
    expect(wrapper.text()).toContain("Test Instructions");
  });

  it("should process ingredients and measurements correctly", async () => {
    vi.spyOn(recipeService, "getRecipeById").mockReturnValue(mockRecipe);

    const wrapper = mount(Recipe, {
      props: {
        id: 1,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Ingredient 1: 1 cup");
    expect(wrapper.text()).toContain("Ingredient 2: 2 tbsp");
    expect(wrapper.text()).not.toContain("Ingredient 3");
  });

  it("should not display content when recipe is not found", () => {
    vi.spyOn(recipeService, "getRecipeById").mockReturnValue(undefined);

    const wrapper = mount(Recipe, {
      props: {
        id: 999,
      },
    });

    expect(wrapper.text()).toBe("");
  });

  it("should format YouTube URL correctly", async () => {
    vi.spyOn(recipeService, "getRecipeById").mockReturnValue(mockRecipe);

    const wrapper = mount(Recipe, {
      props: {
        id: 1,
      },
    });

    await wrapper.vm.$nextTick();

    const iframe = wrapper.find("iframe");
    expect(iframe.attributes("src")).toBe(
      "https://www.youtube.com/embed/123456"
    );
  });

  it("should display source link correctly", async () => {
    vi.spyOn(recipeService, "getRecipeById").mockReturnValue(mockRecipe);

    const wrapper = mount(Recipe, {
      props: {
        id: 1,
      },
    });

    await wrapper.vm.$nextTick();

    const sourceLink = wrapper.find("a");
    expect(sourceLink.attributes("href")).toBe("https://test-source.com");
    expect(sourceLink.text()).toBe("https://test-source.com");
  });
});
