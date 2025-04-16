import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Favourites from "@/RecipeFinder/Views/Favourites.vue";
import { setActivePinia, createPinia } from "pinia";
import recipeService from "@/RecipeFinder/services/recipeService";

vi.mock("@/RecipeFinder/services/recipeService");

describe("Favourites.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("should render FavouritesList component", () => {
    const wrapper = mount(Favourites, {
      global: {
        stubs: {
          FavouritesList: true,
        },
      },
    });

    expect(wrapper.findComponent({ name: "FavouritesList" }).exists()).toBe(
      true
    );
  });
});
