import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
    routes,
    history: createWebHistory(),
    // linkActiveClass: 'active',
});

router.beforeEach(( to, from ) => {
    if(to.meta.auth) {
        // Here you can add logic to check if the user is authenticated
        // For demonstration purposes, we will assume the user is not authenticated
        return { 
            name: "login",

            query: { 
                redirect: to.fullPath
            } // Redirect to the login page with the original path

        }; // Redirect to login if not authenticated

    }
});

export default router;
