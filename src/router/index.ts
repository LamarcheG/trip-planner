import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../views/TheLoginScreen.vue';
import Trips from '../views/TripsView.vue';
import ActivityView from '../views/ActivityView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/Trips',
            name: 'Trips',
            component: Trips
        },
        {
            path: '/Trips/:id',
            name: 'activities',
            component: ActivityView
        }
    ]
});

router.beforeEach((to, from, next) => {
    const user = localStorage.getItem('user');
    if (to.name !== 'login' && !user) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
