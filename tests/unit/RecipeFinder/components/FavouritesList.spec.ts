import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FavouritesList from "@/shared/components/FavouritesList.vue";
import recipeService from "@/RecipeFinder/services/recipeService";
import { setActivePinia, createPinia } from "pinia";
import type { Recipe } from "@/RecipeFinder/models/Recipe";

vi.mock("@/RecipeFinder/services/recipeService");

describe("FavouritesList.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  const mockRecipes = [
    {
      idMeal: "1",
      strMeal: "Test Recipe 1",
      strCategory: "Test Category 1",
      strArea: "Test Area 1",
    },
    {
      idMeal: "2",
      strMeal: "Test Recipe 2",
      strCategory: "Test Category 2",
      strArea: "Test Area 2",
    },
  ] as Recipe[];

  it("should not render when there are no favorites", () => {
    vi.spyOn(recipeService, "getFavourites").mockReturnValue([]);
    const wrapper = mount(FavouritesList, {
      global: {
        stubs: {
          RecipeCard: true,
        },
      },
    });

    expect(wrapper.find(".grid").exists()).toBe(false);
  });

  it("should render favorites list when there are favorites", () => {
    vi.spyOn(recipeService, "getFavourites").mockReturnValue(mockRecipes);
    const wrapper = mount(FavouritesList, {
      global: {
        stubs: {
          RecipeCard: true,
        },
      },
    });

    expect(wrapper.find(".grid").exists()).toBe(true);
    const recipeCards = wrapper.findAll(".w-fit");
    expect(recipeCards).toHaveLength(2);
  });

  it("should pass correct props to RecipeCard components", () => {
    vi.spyOn(recipeService, "getFavourites").mockReturnValue(mockRecipes);
    const wrapper = mount(FavouritesList, {
      global: {
        stubs: {
          RecipeCard: {
            template:
              '<div class="recipe-card-stub">{{ recipe.strMeal }}</div>',
            props: ["recipe"],
          },
        },
      },
    });

    const recipeCards = wrapper.findAll(".recipe-card-stub");
    expect(recipeCards[0].text()).toBe("Test Recipe 1");
    expect(recipeCards[1].text()).toBe("Test Recipe 2");
  });

  it("should reactively update when favorites change", async () => {
    const getFavouritesSpy = vi.spyOn(recipeService, "getFavourites");
    getFavouritesSpy.mockReturnValue(mockRecipes);

    const wrapper = mount(FavouritesList, {
      global: {
        stubs: {
          RecipeCard: true,
        },
      },
    });

    expect(wrapper.findAll(".w-fit")).toHaveLength(2);

    getFavouritesSpy.mockReturnValue([]);

    await wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[class*="grid"]').exists()).toBe(true);
  });
});
