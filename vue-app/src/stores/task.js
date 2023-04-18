import { defineStore } from "pinia"
import { allTasks } from '../http/task-api'

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        task:{
            id: 1,
            name: "First task",
            is_completed: false
        }
    }),
    getters: {
        completedTasks: (state) => state.tasks.filter(task => task.is_completed),    // By Arrow function
        uncompletedTasks () {
            return this.tasks.filter(task => !task.is_completed)
        },
        // uncompletedCount: (getters) => getters.uncompleted.length
    },
    actions: {
        async fetchAllTasks(){
            const { data } = await allTasks()
            this.tasks = data.data
        }
        // fetchAllTasks(){
        //     this.tasks = [
        //         {
        //             id: 1,
        //             name: "First task",
        //             is_completed: false
        //         },
        //         {
        //             id: 2,
        //             name: "Second task",
        //             is_completed: true
        //         }
        //     ]
        // }
    }
})