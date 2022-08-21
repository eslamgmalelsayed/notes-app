import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '../stores/storeAuth'
import ViewNotes from '../views/ViewNotes.vue'
import ViewStats from '../views/ViewStats.vue'
import ViewEditNote from '../views/ViewEditNote.vue'
import ViewAuth from '@/views/ViewAuth.vue'

const routes = [
            {
                name : 'ViewNotes',
                path : '/',
                component : ViewNotes,

            },
            {
                name : 'ViewStats',
                path : '/stats',
                component : ViewStats,

            },
            {
                name : 'ViewEditNote',
                path : '/edit/:id',
                component : ViewEditNote,

            },
            {
                name : 'ViewAuth',
                path : '/auth',
                component : ViewAuth,

            },
        
    ]
const router = createRouter({
    history : createWebHashHistory(),
    routes
})

    // guards
    router.beforeEach(async (to, from) => {
        const storeAuth = useStoreAuth()
        if(!storeAuth.user.id && to.name !== 'ViewAuth'){
            return { name: 'ViewAuth' }
        }
        if(storeAuth.user.id && to.name === 'ViewAuth'){
            return false
        }
    })

export default router