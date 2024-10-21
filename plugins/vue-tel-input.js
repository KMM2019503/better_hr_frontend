// import Vue from "vue";
import { defineNuxtPlugin } from "nuxt/app";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTelInput);
});
