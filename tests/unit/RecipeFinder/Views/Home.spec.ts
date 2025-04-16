import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "@/RecipeFinder/Views/Home.vue";
import { setActivePinia, createPinia } from "pinia";
import recipeService from "@/RecipeFinder/services/recipeService";
import { useRecipesStore } from "@/stores/recipes";
import RecipeList from "@/shared/components/RecipeList.vue";

vi.mock("@/RecipeFinder/services/recipeService");

describe("Home", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const store = useRecipesStore();
    store.recipes = [];
    vi.clearAllMocks();
  });

  it("renders properly", () => {
    vi.spyOn(recipeService, "getRecipesFromStore").mockReturnValue([]);
    const wrapper = mount(Home, {
      global: {
        stubs: {
          RecipeList: true,
          RecipeCard: true,
        },
      },
    });
    expect(wrapper.text()).toContain("¡Your next chef's kiss dish!");
  });

  it("should handle search with enter key", async () => {
    vi.spyOn(recipeService, "getRecipesFromStore").mockReturnValue([]);
    const wrapper = mount(Home, {
      global: {
        stubs: {
          RecipeList: true,
          RecipeCard: true,
        },
      },
    });
    const input = wrapper.find('input[type="email"]');
    const getRecipesSpy = vi
      .spyOn(recipeService, "getRecipes")
      .mockResolvedValue();

    await input.setValue("chicken");
    await input.trigger("keyup.enter");

    expect(getRecipesSpy).toHaveBeenCalledWith("chicken");
  });

  it("should handle search with button click", async () => {
    vi.spyOn(recipeService, "getRecipesFromStore").mockReturnValue([]);
    const wrapper = mount(Home, {
      global: {
        stubs: {
          RecipeList: true,
          RecipeCard: true,
        },
      },
    });
    const input = wrapper.find('input[type="email"]');
    const button = wrapper.find("button");
    const getRecipesSpy = vi
      .spyOn(recipeService, "getRecipes")
      .mockResolvedValue();

    await input.setValue("pasta");
    await button.trigger("click");

    expect(getRecipesSpy).toHaveBeenCalledWith("pasta");
  });

  it("should handle search error", async () => {
    vi.spyOn(recipeService, "getRecipesFromStore").mockReturnValue([]);
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const wrapper = mount(Home, {
      global: {
        stubs: {
          RecipeList: true,
          RecipeCard: true,
        },
      },
    });
    const input = wrapper.find('input[type="email"]');
    vi.spyOn(recipeService, "getRecipes").mockRejectedValue(
      new Error("API Error")
    );

    await input.setValue("invalid");
    await input.trigger("keyup.enter");

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching recipes:",
      expect.any(Error)
    );
  });
});
