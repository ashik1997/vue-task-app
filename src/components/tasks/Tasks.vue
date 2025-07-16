<template>
    <div class="card mt-2" v-if="tasks.length && show">
        <ul class="list-group list-group-flush">
            <Task v-for="task in tasks" 
                :key="task.id" 
                :task="task" 
                @updated="handleUpdatedTask"
                @completed="handleCompletedTask"
                @removed="handleRemovedTask"
                />
        </ul>
    </div>
</template>
<script setup>
import { useTaskStore } from '@/stores/task';

import Task from '@/components/tasks/Task.vue';

const taskStore = useTaskStore();

const { handleUpdatedTask, handleCompletedTask, handleRemovedTask } = taskStore;

defineProps({
    tasks: Array,
    show: {
        type: Boolean,
        default: true,
    },
});

</script>