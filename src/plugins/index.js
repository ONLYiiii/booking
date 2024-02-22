/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import router from "../router";
import { createPinia } from "pinia";

import { i18n } from "./locale";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const options = {
  confirmButtonColor: "#3F51B5",
  cancelButtonColor: "#EEEEEE",
  confirmButtonText: "ตกลง",
  cancelButtonText: "ยกเลิก",
};

import "./pdfmake-style.js";
export function registerPlugins(app) {
  const pinia = createPinia();

  app
    .use(i18n)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueSweetalert2, options);
}
