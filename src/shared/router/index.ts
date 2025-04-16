import { createRouter, createWebHistory } from "vue-router";
import Home from "@/RecipeFinder/Views/Home.vue";
import Recipe from "@/RecipeFinder/Views/Recipe.vue";
import Favourites from "@/RecipeFinder/Views/Favourites.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/recipe/:id",
      name: "recipe",
      component: Recipe,
      props: (route) => ({
        id: Number(route.params.id),
      }),
    },
    {
      path: "/favourites",
      name: "favourites",
      component: Favourites,
    },
  ],
});

export default router;
