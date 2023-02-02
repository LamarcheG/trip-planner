import router from '@/router';
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
import { doc, setDoc } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useFirestore } from 'vuefire';

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
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                user.value = result.user;
                addUserToDB();
                router.push('/');
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
                console.log(errorCode, errorMessage, email, credential);
            });
    }

    function addUserToDB() {
        const db = useFirestore();
        if (user.value) {
            const userRef = doc(db, 'Users', user.value.uid);
            setDoc(userRef, {
                displayName: user.value.displayName,
                email: user.value.email,
                photoURL: user.value.photoURL
            });
        }
    }

    function logout() {
        signOut(auth);
        user.value = null;
        window.location.reload();
    }

    return {
        user,
        loginWithGoogle,
        logout,
        getInitials,
        isLoggedIn
    };
});
