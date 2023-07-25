/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

import Clipboard from 'v-clipboard';
import VueMobileDetection from "vue-mobile-detection";

const app = createApp(App);

registerPlugins(app);

app.use(Clipboard);
app.use(VueMobileDetection);

app.mount("#app");
