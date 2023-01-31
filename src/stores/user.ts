import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { defineStore } from 'pinia';
import { computed } from 'vue';

interface User {
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
}

export const useUserStore = defineStore('user', () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const user = useLocalStorage('user', null, {
        serializer: StorageSerializers.object
    });

    const isLoggedIn = computed(() => !!user.value);

    const getInitials = () => {
        var result = '';
        if (user.value) {
            const name = user.value.displayName;
            if (name) {
                const names = name.split(' ');
                if (names.length === 1) {
                    result = names[0].charAt(0);
                } else {
                    result = names[0].charAt(0) + names[1].charAt(0);
                }
                return result.toLocaleUpperCase();
            }
        }
        return '';
    };

    function loginWithGoogle() {
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
                window.location.reload();
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
    function signupWithPassword(email: string, password: string) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                user.value = userCredential.user;
                window.location.reload();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    function loginWithPassword(email: string, password: string) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                user.value = userCredential.user;
                window.location.reload();
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    function logout() {
        signOut(auth);
        user.value = null;
        window.location.reload();
    }

    return {
        user,
        loginWithGoogle,
        signupWithPassword,
        loginWithPassword,
        logout,
        getInitials,
        isLoggedIn
    };
});
