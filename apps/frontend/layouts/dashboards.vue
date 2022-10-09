<template>
  <v-app>
    <v-navigation-drawer :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" fixed="true" app>
      <v-list>
        <v-list-item router :to="item.to" :key="item.to" v-for="item in routes" exact>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app :clipped-left="clipped">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const routes = [
  {
    title: "Таск трекер",
    to: "/dashboards/tasks",
  },
  {
    title: "Аккаунтинг",
    to: "/dashboards/accounting",
  },
  {
    title: "Аналитика",
    to: "/dashboards/analitics",
  },
]
const clipped = ref(true),
  drawer = ref(true),
  miniVariant = ref(false)

</script>
  