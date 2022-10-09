<script setup lang="ts">
const { getAllTasks, reshufleTasks: _reshufleTasks } = useApi()

const tasks = ref(await getAllTasks())

const isLoading = ref(false)

async function reshufleTasks() {
  try {
    isLoading.value = true
    await _reshufleTasks()
    tasks.value = await getAllTasks()
  } catch (error) {
    alert('Something went wrong( Try again later(')
  } finally {
    isLoading.value = false
  }
}

async function refetchTasks() {
  try {
    tasks.value = await getAllTasks()
  } catch (error) {
    alert('Something went wrong( Try again later(')
  }
}
</script>

<template>
  <nuxt-layout name="dashboards">
    <div>
      <v-btn @click="reshufleTasks" :loading="isLoading">reshufleTasks</v-btn>
      <v-btn to="/dashboards/tasks/add">add task</v-btn>
    </div>
    <tasks-list :tasks="tasks" @refetch="refetchTasks" />
  </nuxt-layout>
</template>
