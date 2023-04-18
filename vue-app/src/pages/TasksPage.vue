<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask />

                    <!-- List of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTasks" />

                    <!-- show toggle button -->
                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button 
                            class="btn btn-sm btn-secondary"
                            @click="showCompletedTasks = !showCompletedTasks"
                        >
                            <span v-if="!showCompletedTasks">Show completed</span>
                            <span v-else>Hide completed</span>
                        </button>
                    </div>

                    <!-- list of completed tasks -->
                    <Tasks :tasks="completedTasks" :show="completedTasksIsVisible && showCompletedTasks" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { storeToRefs } from "pinia"
import { useTaskStore } from '../stores/task'
import { allTasks, createTask, updateTask, completeTask, removeTask } from "../http/task-api"
import Tasks from "../components/tasks/Tasks.vue"
import NewTask from "../components/tasks/NewTask.vue";

const store = useTaskStore()
const { completedTasks, uncompletedTasks } = storeToRefs(store)
const { fetchAllTasks } = store
// store.task.name = "First task updated"
// store.task.is_completed = true
// store.$patch({
//     task: {
//         name: "First task updated",
//         is_completed: true
//     }
// })

onMounted(async () => {
    // const { data } = await allTasks()
    // tasks.value = data.data
    await fetchAllTasks()
    // tasks.value = data.data.filter(task => task.is_completed)
    // console.log(completed.value);
    // console.log(uncompleted.value);
    // console.log(uncompletedCount.value);
})

// const uncompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed))
// const completedTasks = computed(() => tasks.value.filter(task => task.is_completed))
const showToggleCompletedBtn = computed(
    () => uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
)
const completedTasksIsVisible = computed(
    () => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
)
// const showCompletedTasks = ref(completedTasksIsVisible.value)
const showCompletedTasks = ref(false)

</script>