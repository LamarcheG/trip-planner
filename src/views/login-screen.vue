<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { useUserStore } from '../stores/user';

const provider = new GoogleAuthProvider();
const auth = getAuth();

const user = useUserStore().user;

console.log(user);

function submit() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            useUserStore().login(user);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}
</script>

<template>
    <form @submit.prevent="submit">
        <button type="submit">Register</button>
    </form>

    <p>{{ user?.displayName }} {{ user?.email }}</p>
</template>
