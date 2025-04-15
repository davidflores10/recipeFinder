import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Home from "../../../../src/RecipeFinder/Views/Home.vue";
import { setActivePinia, createPinia } from "pinia";

describe("Home", () => {
  setActivePinia(createPinia());

  it("renders properly", () => {
    const wrapper = mount(Home);
    expect(wrapper.text()).toContain("¡Your next chef's kiss dish!");
  });
});
