<script setup lang="ts">
import { Task } from '~~/types'
const { finishTask: _finishTask } = useApi()

defineProps<{ task: Task }>()
const emit = defineEmits(['task-finished'])

const isLoading = ref(false)

async function finishTask(id: string) {
    try {
        isLoading.value = true
        await _finishTask(id)
        emit('task-finished')
    } catch (error) {
        alert('Something went wrong( Try again later(')
    } finally {
        isLoading.value = false

    }
}
</script>

<template>
    <tr>
        <th>{{task.title}}</th>
        <th>{{task.assigner?.name}}</th>
        <th>{{task.description}}</th>
        <th>{{task.isOpen}}</th>
        <th >
            <v-btn v-if="task.isOpen" @click="finishTask(task.id)">finish task</v-btn>
        </th>
    </tr>
</template>
