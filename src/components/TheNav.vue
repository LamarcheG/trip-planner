<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const userStore = useUserStore();
const user = userStore?.user;
const photoURL = user?.photoURL;

const menuIsOpen = ref(false);

function toggleMenu() {
    menuIsOpen.value = !menuIsOpen.value;
}

function logout() {
    useUserStore().logout();
}
</script>

<template>
    <div class="navContainer">
        <button v-if="user" class="btn-menuToggle" @click="toggleMenu">
            <img :src="photoURL" class="profilePic" alt="profile picture" />
        </button>
        <div v-if="menuIsOpen">
            <button @click="logout">Log out</button>
        </div>
        <nav v-if="user" class="navbar">
            <RouterLink to="/" class="link">Home</RouterLink>
        </nav>
    </div>
</template>

<style scoped>
.btn-menuToggle {
    background: none;
    border: none;
    cursor: pointer;
}
.profilePic {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-left: 1.5rem;
}
.navContainer {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid rgb(65, 65, 65);
}
.link {
    margin: 0 1.5rem;
}
.navbar {
    align-items: center;
    padding: 1rem;
}
</style>
