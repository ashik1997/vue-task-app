import { defineStore } from "pinia";

import { ref, computed } from "vue";

import { csrfCookie, login, register, logout, getUser } from "@/http/auth-api";

export const useAuthStore = defineStore("authStore", () => {
    const user = ref(null);
    const errors = ref({});

    const isLoggedIn = computed(() => !!user.value);

    const fetchUser = async () => {
        try {
            const { data } = await getUser();
            user.value = data;
        }catch(error){
            user.value = null;
        }
    };

    const handleLogin = async(credentials) => {
        await csrfCookie();
        try {
            await login(credentials);
            await fetchUser();
            errors.value = {}; // Clear errors on successful login
        } catch (error) {
            if(error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;

            }
        }
    };

    const handleRegister = async(newUser) => {
        try {

            await csrfCookie();
            await register(newUser);
            await handleLogin({
                email: newUser.email,
                password: newUser.password,
            })
            
        } catch (error) {
            if(error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;

            }
        }
        
    };

    const handleLogout = async() => {
        await logout();
        user.value = null;
    };

    return {
        user,
        errors,
        isLoggedIn,
        fetchUser,
        handleLogin,
        handleRegister,
        handleLogout,
    };

});