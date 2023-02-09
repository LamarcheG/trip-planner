<template>
    <div class="infoContainer">
        <div class="btn-row">
            <button type="button" @click="ModifyItem">Modify</button>
            <button type="button" @click="DeleteItem">X</button>
        </div>
        <RouterLink :to="{ name: 'activities', params: { id: trip.title } }">
            <ul v-for="(value, key) in formattedTrips">
                <li v-if="value !== null" class="info">
                    <h2>{{ key }}</h2>
                    <p v-if="Array.isArray(value)">
                        {{ tripstore.formatAttendees(value) }}
                    </p>
                    <p v-else>{{ value }}</p>
                </li>
            </ul>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import type { Trip } from './Interfaces';
import { RouterLink } from 'vue-router';
import { useTripStore } from '@/stores/trip';
import { computed } from 'vue';

const props = defineProps<{
    trip: Trip;
}>();

const tripstore = useTripStore();

const formattedTrips = computed(() => {
    const orderedTrip = {
        title: props.trip?.title,
        description: props.trip?.description,
        startDate: props.trip?.startDate,
        endDate: props.trip?.endDate,
        budget: props.trip?.budget,
        attendees: props.trip?.attendees
    };
    return orderedTrip;
});

function ModifyItem() {
    console.log('Modify', props.trip.id);
}
function DeleteItem() {
    console.log('Delete', props.trip.id);
}
</script>

<style scoped>
.btn-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.btn-row button {
    padding: 10px 20px;
    height: 2rem;
    border-radius: 5px;
    border: none;
    background-color: var(--color-background-soft);
    color: white;
}
.btn-row button:hover {
    background-color: var(--color-background);
}
.infoContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin: 2rem auto;
    padding: 2rem;
    background-color: var(--color-border);
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
