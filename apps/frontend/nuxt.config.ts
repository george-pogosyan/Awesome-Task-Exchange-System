// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:8080/api/v1'
    }
  },

  ssr: false,

  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  
  build: {
    transpile: ['vuetify'],
  },
  
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  modules: ['@pinia/nuxt']
})
