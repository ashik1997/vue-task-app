import { createRouter, createWebHistory } from 'vue-router';

import routes from './routes';

import { useAuthStore } from "@/stores/auth";

const router = createRouter({
    routes,
    history: createWebHistory(),
    // linkActiveClass: 'active',
});

router.beforeEach(async ( to, from ) => {

    const store = useAuthStore();

    await store.fetchUser(); // Fetch user data before each route change

    if(to.meta.auth && !store.isLoggedIn) {
        // Here you can add logic to check if the user is authenticated
        // For demonstration purposes, we will assume the user is not authenticated
        return { 
            name: "login",

            query: { 
                redirect: to.fullPath
            } // Redirect to the login page with the original path

        }; // Redirect to login if not authenticated
        
    } else if(to.meta.guest && store.isLoggedIn) {
        // If the route is for guests and the user is already logged in, redirect to home
        return { name: "tasks" };
    }
});

export default router;
