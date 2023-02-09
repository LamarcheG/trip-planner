<template>
    <div class="infoContainer">
        <ul v-for="(value, key) in formattedActivities">
            <li v-if="value !== null" class="info">
                <h2>{{ key }}</h2>
                <p v-if="Array.isArray(value)">
                    {{ formatAttendees(value) }}
                </p>
                <p v-else>{{ value }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { Activity } from './Interfaces';
import { computed } from 'vue';

function formatAttendees(attendees: string[]) {
    // display as Person1, Person2 and Person3
    if (attendees.length === 1) {
        return attendees[0];
    } else if (attendees.length === 2) {
        return attendees[0] + ' and ' + attendees[1];
    } else if (attendees.length > 2) {
        return attendees[0] + ', ' + attendees[1] + ' and ' + attendees[2];
    }
}

const formattedActivities = computed(() => {
    const orderedActivity = {
        title: props.activity?.title,
        description: props.activity?.description,
        categpry: props.activity?.category,
        cost: props.activity?.cost,
        startDate: props.activity?.startDate,
        endDate: props.activity?.endDate,
        attendees: props.activity?.attendees
    };
    return orderedActivity;
});

const props = defineProps<{
    activity: Activity;
}>();
</script>

<style scoped>
.infoContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin: 2rem auto;
    padding: 2rem;
    background-color: var(--color-background-soft);
    border-radius: 10px;
    color: var(--color-text);
}
.info {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 3rem;
}
h2 {
    margin-right: 10px;
}
h2::after {
    content: ':';
}
</style>
