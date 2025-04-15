import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import "@/shared/styles/main.css";
import router from "./shared/router";

/* Import Font Awesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

/* Add icons to the library */
library.add(faHeart);
library.add(faHeartRegular);

const app = createApp(App);
const pinia = createPinia();

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);
app.use(router);
app.mount("#app");
