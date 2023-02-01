<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import ActivityForm from '@/components/Activity/ActivityForm.vue';

const userStore = useUserStore().user;
</script>

<template>
    <div>
        <p>
            Welcome
            {{
                userStore?.displayName
                    ? userStore?.displayName
                    : userStore?.email
            }}
        </p>
        <ActivityForm />
    </div>
</template>
