<template>
    <TransitionGroup name="activityList" tag="ul" class="activityList">
        <ActivityListItem
            v-for="activity in activities"
            :key="activity.title"
            :activity="activity"
        />
    </TransitionGroup>
</template>

<script setup lang="ts">
import ActivityListItem from './ActivityListItem.vue';
import type { Activity } from './Interfaces';

const props = defineProps<{
    activities: Activity[];
}>();
</script>

<style scoped>
.activityList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem 3rem;
    width: 70%;
    margin: 5rem auto;
}
.activityList-enter-active,
.activityList-leave-active {
    transition: all 0.5s ease;
}
.activityList-enter-from,
.activityList-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
