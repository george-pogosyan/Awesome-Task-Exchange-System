<script setup lang="ts">
const roles = ['worker', 'manager', 'admin']

const state = reactive({
  name: '',
  email: '',
  password: '',
  role: '',
})

const isLoading = ref(false)

const { register, login } = useApi()

async function submit() {
  isLoading.value = true
  try {
    await register(state)
    await login({ email: state.email, password: state.password })
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
      <h3 class="text-h3">Register</h3>
      <br>
      <v-text-field type="text" v-model="state.name" placeholder="name" />
      <v-text-field type="email" v-model="state.email" placeholder="email" />
      <v-text-field type="password" v-model="state.password" placeholder="password" />
      <v-select :items="roles" v-model="state.role" placeholder="role"></v-select>
      <v-btn @click="submit" type="submit" class="" :loading="isLoading">register</v-btn>
    </v-col>
  </v-container>
</template>
