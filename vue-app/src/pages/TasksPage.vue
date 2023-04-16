<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <div class="relative">
                        <input type="text" class="form-control form-control-lg padding-right-lg"
                            placeholder="+ Add new task. Press enter to save." />
                    </div>
                    <!-- List of uncomplted tasks -->
                    <Tasks :tasks="uncompltedTasks"  />

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
                    <Tasks :tasks="compltedTasks" :show="completedTasksIsVisible && showCompletedTasks" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { allTasks } from "../http/task-api"
import Tasks from "../components/tasks/Tasks.vue"

const tasks = ref([])
onMounted(async () => {
    const { data } = await allTasks()
    tasks.value = data.data
    // tasks.value = data.data.filter(task => task.is_completed)
})

const uncompltedTasks = computed(() => tasks.value.filter(task => !task.is_completed))
const compltedTasks = computed(() => tasks.value.filter(task => task.is_completed))
const showToggleCompletedBtn = computed(
    () => uncompltedTasks.value.length > 0 && compltedTasks.value.length > 0
)
const completedTasksIsVisible = computed(
    () => uncompltedTasks.value.length === 0 || compltedTasks.value.length > 0
)
// const showCompletedTasks = ref(completedTasksIsVisible.value)
const showCompletedTasks = ref(false)

</script>