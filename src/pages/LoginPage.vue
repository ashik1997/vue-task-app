<template>
    <main style="min-height: 50vh; margin-top: 2rem">
        <h1>Login</h1>
        <form>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password">
            </div>
            <button type="button" @click="handleLogin" class="btn btn-primary">Submit</button> 
            <div class="mt-3">
                <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
            </div>
        </form>
    </main>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const handleLogin = () => {
    router.push({ name: 'tasks' });
};
</script>