<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore().user;
</script>

<template>
    <div>
        Welcome
        {{ userStore?.displayName ? userStore?.displayName : userStore?.email }}
    </div>
</template>
