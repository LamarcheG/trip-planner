<template>
    <div>
        <h1>Home</h1>
        <p>
            This is an app to plan trips with your friend. To proceed, click on
            the <RouterLink to="/Trips" class="link">Trips</RouterLink> tab
        </p>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
}
h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}
.link {
    font-size: larger;
}
</style>
