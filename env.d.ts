/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@fortawesome/vue-fontawesome";
declare module "@fortawesome/fontawesome-svg-core";
declare module "@fortawesome/free-solid-svg-icons";
declare module "@fortawesome/free-regular-svg-icons";
