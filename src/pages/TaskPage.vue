<template>
    <main style="min-height: 50vh; margin-top: 2rem">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask />

                    <!-- List of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTasks"
                    />

                    <!-- show toggle button -->
                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary" @click="$event=>showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show completed task</span>
                            <span v-else>Hide completed task</span>
                        </button>
                    </div>

                    <!-- List of completed tasks -->
                    <Tasks :tasks="completedTasks"  :show="completedTasksIsVisible && showCompletedTasks"
                    
                    />
                    
                </div>
            </div>
        </div>
    </main>      
</template>
<script setup>
    import { computed, onMounted, ref } from 'vue';

    import { storeToRefs } from "pinia";

    import { useTaskStore } from "../stores/task";

    // import {  } from '@/http/task-api';

    import Tasks from '@/components/tasks/Tasks.vue';

    import NewTask from '@/components/tasks/NewTask.vue';

    const taskStore = useTaskStore();

    const { completedTasks, uncompletedTasks } = storeToRefs(taskStore);
    const { fetchAllTasks  } = taskStore;

    

    onMounted(async () => {
       await fetchAllTasks();
    //    console.log(taskStore.tasks);
    });


    const showToggleCompletedBtn = computed(() => {
        return uncompletedTasks.value.length > 0 && completedTasks.value.length > 0;
    });

    const completedTasksIsVisible = computed(() => {
        return uncompletedTasks.value.length === 0 || completedTasks.value.length > 0;
    });

    const showCompletedTasks = ref(false);

    
    
    
</script>