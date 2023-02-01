<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from '@/components/Login/LoginForm.vue';
import SignUpForm from '@/components/Login/SignUpForm.vue';
const isSigningUp = ref(false);

function getCurrentComponent() {
    if (isSigningUp.value) {
        return SignUpForm;
    } else {
        return LoginForm;
    }
}
</script>

<template>
    <div class="formContainer">
        <component :is="getCurrentComponent()"></component>
        <button
            v-if="!isSigningUp"
            class="btn-login btn-signup"
            @click="() => (isSigningUp = !isSigningUp)"
        >
            Don't have an account? Sign Up
        </button>
        <button
            v-if="isSigningUp"
            class="btn-login btn-signup"
            @click="() => (isSigningUp = !isSigningUp)"
        >
            Already have an account? Log In
        </button>
    </div>
</template>

<style scoped>
.formContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #202020;
    padding: 3rem 2rem;
    width: 70%;
    border-radius: 10px;
}
.btn-login {
    width: 12rem;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 0.75rem;
}
.btn-signup {
    background: none;
    text-decoration: underline;
}
</style>
