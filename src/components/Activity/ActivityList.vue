<template>
    <ul>
        <ActivityListItem
            v-for="activity in activities"
            :key="activity.title"
            :activity="activity"
        />
    </ul>
</template>

<script setup lang="ts">
import ActivityListItem from './ActivityListItem.vue';
import type { Activity } from './Interfaces';

const props = defineProps<{
    activities: Activity[];
}>();
</script>

<style scoped>
ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem 3rem;
    width: 70%;
    margin: 5rem auto;
}
</style>
