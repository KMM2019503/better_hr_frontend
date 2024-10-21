// nuxt.config.js
export default defineNuxtConfig({
  plugins: ["~/plugins/vue-tel-input", "~/plugins/vue-phone-number-input"],
  compatibilityDate: "2024-04-03",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt", "@element-plus/nuxt", "@nuxtjs/apollo"],
  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://127.0.0.1:8000/graphql/user",
      },
    },
  },
  ssr: false,
});
