import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Home from "../../../../src/RecipeFinder/Views/Home.vue";

describe("Home", () => {
  it("renders properly", () => {
    const wrapper = mount(Home);
    expect(wrapper.text()).toContain("hello");
  });
});
