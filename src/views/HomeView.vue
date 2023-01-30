<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore().user?.displayName;
</script>

<template>
    <div>Welcome {{ userStore ? userStore : 'Unknown user' }}</div>
</template>
