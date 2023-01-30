<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth';

import { useUserStore } from '../stores/user';

const auth = getAuth();

function login() {
    useUserStore().login();
}
function logout() {
    useUserStore().logout();
}
</script>

<template>
    <form @submit.prevent="login">
        <button type="submit" class="GoogleLogin">Login with Google</button>
    </form>
    <form @submit.prevent="logout">
        <button type="submit" class="logout">Log out</button>
    </form>
</template>

<style scoped>
.GoogleLogin {
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
}
.logout {
    background-color: #f46642;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
}
</style>
