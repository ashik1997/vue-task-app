import TaskPage from "@/pages/TaskPage.vue";

import LoginPage from "@/pages/LoginPage.vue";

import RegisterPage from "@/pages/RegisterPage.vue";

import SummaryPage from "@/pages/SummaryPage.vue";
import NotFoundErrorPage from "@/pages/errors/NotFoundErrorPage.vue";
import HomePage from "@/pages/HomePage.vue";

const routes = [
    
    {
        path: "/",
        name: "home",
        component: HomePage
    },
    {
        path: "/tasks",
        name: "tasks",
        component: TaskPage,
        // meta: {
        //     auth: true
        // }
    },
    {
        path: "/summary",
        name: "summary",
        component: SummaryPage,
        // meta: {
        //     auth: true
        // }
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage,
    },
    {
        path: "/register",
        name: "register",
        component: RegisterPage,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "error-404",
        component: NotFoundErrorPage,

    }
]

export default routes;