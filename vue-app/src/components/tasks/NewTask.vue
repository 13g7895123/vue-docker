<template>
    <div class="relative">
        <input type="text" 
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new task. Press enter to save." 
            @keydown.enter="addNewTask"
        />
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const newTask = reactive({
    name: '',
    is_completed: false
})

const emit = defineEmits(['added'])

const addNewTask = event => {
    if (event.target.value.trim()){     // .target.value 可以取得input值，且非空值
        newTask.name = event.target.value
        event.target.value = ''         // 將input值清空
        emit('added', newTask)
    }
}

</script>