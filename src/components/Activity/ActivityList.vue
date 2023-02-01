<template>
    <div>
        <ActivityListItem
            v-for="activity in activities"
            :key="activity.title"
            :activity="activity"
        />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ActivityListItem from './ActivityListItem.vue';
import type { Activity } from './Interfaces';

const props = defineProps<{
    activities: Activity[];
}>();
</script>

<style scoped></style>
