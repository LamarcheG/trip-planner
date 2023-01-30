<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import { collection, addDoc } from 'firebase/firestore';
import { ref, onMounted } from 'vue';
import { useCollection, useFirestore } from 'vuefire';

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
}

const db = useFirestore();

const employeesCollection = useCollection(collection(db, 'employees'));

const firstName = ref('');
const lastName = ref('');

function addEmployee() {
    addDoc(collection(db, 'employees'), {
        firstName: firstName.value,
        lastName: lastName.value
    });
}
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
    </nav>
    <RouterView />
    <ul>
        <li v-for="employee in employeesCollection" :key="employee.id">
            {{ employee.firstName }} {{ employee.lastName }}
        </li>
    </ul>
</template>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>
