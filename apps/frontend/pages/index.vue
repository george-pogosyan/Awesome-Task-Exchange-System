<script setup lang="ts">
const { login } = useApi()

const state = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)

async function submit() {
  isLoading.value = true
  try {
    await login(state)
    await navigateTo('/dashboards/tasks')
  } catch (error) {
    alert('something went wrong')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <v-container>
    <v-col :cols="4" class="ml-auto mr-auto">
      <h3 class="text-h3">Login</h3>
      <br>
      <v-text-field type="text" v-model="state.email" />
      <v-text-field type="password" v-model="state.password" />
      <v-btn @click="submit" class="" :loading="isLoading">submit</v-btn>
    </v-col>
  </v-container>
</template>