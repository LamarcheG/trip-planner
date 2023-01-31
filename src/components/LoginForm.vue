<script setup lang="ts">
import { ref } from 'vue';

import { useUserStore } from '../stores/user';

const email = ref('');
const password = ref('');
const passwordError = ref('');

function login() {
    useUserStore().loginWithGoogle();
}
function loginWithPassword() {
    if (!email.value || !password.value) {
        return;
    } else if (password.value.length < 6) {
        passwordError.value = 'Password must be at least 6 characters';
        return;
    }
    useUserStore().loginWithPassword(email.value, password.value);
}
</script>

<template>
    <div>
        <h1>Login</h1>
        <form
            @submit.prevent="loginWithPassword"
            class="form-loginWithPassword"
            id="loginWithPassword"
        >
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" />
            <label for="password">Password</label>
            <p v-if="passwordError">{{ passwordError }}</p>
            <input type="password" id="password" v-model="password" />
        </form>
        <form @submit.prevent="login" id="loginWithGoogle"></form>
        <div class="btnContainer">
            <button
                type="submit"
                class="btn-PasswordLogin btn-login"
                form="loginWithPassword"
            >
                Login
            </button>
            <button
                type="submit"
                class="btn-GoogleLogin btn-login"
                form="loginWithGoogle"
            >
                Login with Google
            </button>
        </div>
    </div>
</template>

<style scoped>
label {
    margin-top: 1rem;
    font-size: 1rem;
}
input {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
}
.btnContainer {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.btn-login {
    width: 12rem;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 1rem 0;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
}
.btn-GoogleLogin {
    background-color: #4285f4;
}
.btn-PasswordLogin {
    background-color: #313438;
}
.form-loginWithPassword {
    display: flex;
    flex-direction: column;
}
</style>
