<script setup lang="ts">
const task = reactive({
  name: '',
  description: '',
})

const isLoading = ref(false)

const { createTask } = useApi()

async function submit() {
  isLoading.value = true
  try {
    await createTask(task)
    await navigateTo('/dashboards/tasks')
  } catch (error) {
    alert('something went wrong')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <nuxt-layout name="dashboards">
    <v-container>
      <v-col :cols="4" class="ml-auto mr-auto">
        <h3 class="text-h3">Add task</h3>
        <br>
        <v-text-field type="text" v-model="task.name" placeholder="name" />
        <v-text-field type="text" v-model="task.description" placeholder="description" />
        <v-btn @click="submit" type="submit" class="" :loading="isLoading">add task</v-btn>
      </v-col>
    </v-container>
  </nuxt-layout>
</template>