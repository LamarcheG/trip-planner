<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div>
        <nav class="navbar">
            <RouterLink to="/" class="link">Home</RouterLink>
            <RouterLink to="/login">Login</RouterLink>
        </nav>
    </div>
</template>

<style scoped>
div {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
}
.link {
    margin-right: 1.5rem;
}
.navbar {
    align-items: center;
    padding: 1rem;
}
</style>
