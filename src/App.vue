<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheNav from '@/components/TheNav.vue';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
</script>

<template>
    <TheNav />
    <RouterView />
</template>

<style scoped></style>
