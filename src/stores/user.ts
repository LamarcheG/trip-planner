import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import {
    browserLocalPersistence,
    getAuth,
    GoogleAuthProvider,
    setPersistence,
    signInWithPopup,
    signOut,
    type User
} from 'firebase/auth';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useUserStore = defineStore('user', () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const user = useLocalStorage('user', null, {
        serializer: StorageSerializers.object
    });

    function login() {
        setPersistence(auth, browserLocalPersistence).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
        });
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                user.value = result.user;
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    function logout() {
        signOut(auth);
        user.value = null;
    }

    return { user, login, logout };
});
