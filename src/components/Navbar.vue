<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container py-2">
            <a href="#" @click.prevent="$router.push('/')" class="navbar-brand">
                <span>To Do </span>
                <strong>List</strong>
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <template v-if="store.isLoggedIn">
                        <li class="nav-item">
                            <router-link :to="{ name: 'tasks' }" class="nav-link">Tasks</router-link>
                             <!-- <a href="#" class="nav-link" @click.prevent="$router.push('/tasks')">Tasks</a> -->
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'summary' }" class="nav-link">Summary</router-link>
                        </li>
                    </template>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <template v-if="!store.isLoggedIn">
                        <li class="nav-item">
                            <router-link :to="{ name: 'login' }" class="btn btn-outline-secondary ms-2"
                                >Login</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'register' }" class="btn btn-danger ms-2">Register</router-link>
                        </li>
                    </template>
                    <template v-else>
                        
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" :class="toggleClass" @click.prevent="toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ store.user ? store.user.name : 'User' }}
                        </a>
                        <ul class="dropdown-menu" :class="toggleClass">
                            <li><a href="#" class="dropdown-item" @click.prevent="logout"
                                >Logout</a
                            ></li>
                        </ul>
                        </li>
                    </template>
                </ul>
            </div>

        </div>
    </nav>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth";

const router = useRouter();

const store = useAuthStore();

const isOpen = ref(false);

const logout = async () =>{
    await store.handleLogout();
    isOpen.value = false; // Close the dropdown after logout
    // Redirect to login page after logout
    router.push({ name: "login" });
}


const toggle = () => isOpen.value = !isOpen.value;

const toggleClass = computed(() => isOpen.value === true ? "show" : "");

</script>
<style scoped>
    .nav-link.active {
        color: rgba(168, 37, 37, 0.9);
    }
</style>