<template>
    <ul class="infoContainer">
        <li v-for="(value, key) in trip" class="info">
            <h2>{{ key }}</h2>
            <p v-if="Array.isArray(value)">
                {{ formatAttendees(value) }}
            </p>
            <p v-else>{{ value }}</p>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { Trip } from './Interfaces';

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

const props = defineProps<{
    trip: Trip;
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
    background-color: #3f3f3f;
    border-radius: 10px;
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
