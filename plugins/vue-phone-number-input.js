import { defineNuxtPlugin } from "nuxt/app";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VuePhoneNumberInput);
});
