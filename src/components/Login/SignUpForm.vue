<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../../stores/user';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const passwordError = ref('');
const confirmPassword = ref('');
const confirmPasswordError = ref('');

function login() {
    useUserStore().loginWithGoogle();
}
</script>

<template>
    <div>
        <h1>Sign up</h1>

        <form @submit.prevent="login" id="loginWithGoogle"></form>
        <div class="btnContainer">
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
.form-signUpWithPassword {
    display: flex;
    flex-direction: column;
}
</style>
