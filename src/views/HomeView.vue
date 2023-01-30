<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { getAuth } from '@firebase/auth';

const user = getAuth();
const userStore = useUserStore().user?.displayName;
</script>

<template>Welcome {{ userStore }}</template>
