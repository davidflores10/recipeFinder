import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import App from "@/App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/RecipeFinder/Views/Home.vue";

describe("App.vue", () => {
  it("should render RouterView", () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/",
          name: "home",
          component: Home,
        },
      ],
    });

    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: {
          RouterView: true,
        },
      },
    });

    expect(wrapper.find("#app").exists()).toBe(true);
    expect(wrapper.find("#app").classes()).toContain("min-h-screen");
    expect(wrapper.find("#app").classes()).toContain("bg-gray-100");
  });
});
