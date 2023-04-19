import { createRouter, createWebHistory } from "vue-router"
import routes from "./routes"

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from) => {
    // to and from are both route objects. must call `next`.
    console.log('Global before each', to, from);
    // if (to.path === '/tasks'){
    //     return { 
    //         name: 'login',
    //         query: {
    //             redirect: to.fullPath
    //         }
    //     }
    // }
})

export default router