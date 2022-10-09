<script setup lang="ts">
import { Task } from '~~/types'

defineProps<{
    tasks: Task[]
}>()

const emit = defineEmits(['refetch'])

async function refetchTask() {
    emit('refetch')
}
</script>

<template>
    <v-table>
        <thead>
            <tr>
                <th>
                    Title
                </th>
                <th>
                    Assigner
                </th>
                <th>
                    Description
                </th>
                <th>
                    isOpen
                </th>
                <th>
                    actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tasks-row v-for="task in tasks" :key="task.id" :task="task" @task-finished="refetchTask" />
        </tbody>
    </v-table>
</template>
