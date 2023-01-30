import type { User } from 'firebase/auth';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const user = ref(null as User | null);
    const loading = ref(false);
    const error = ref(null);

    function login(userLogin: User) {
        user.value = userLogin;
        console.log('user.value', user.value);
    }

    return { user, login };
});
