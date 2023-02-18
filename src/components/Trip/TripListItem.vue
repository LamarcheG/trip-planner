<template>
    <div class="infoContainer">
        <div class="btn-row">
            <button
                type="button"
                v-if="!confirmDeleteWindow"
                @click="() => (confirmDeleteWindow = !confirmDeleteWindow)"
            >
                X
            </button>
            <div v-if="confirmDeleteWindow">
                <button type="button" @click="confirmDelete(true)">
                    Delete
                </button>
                <button type="button" @click="confirmDelete(false)">
                    Cancel
                </button>
            </div>
        </div>
        <RouterLink
            :to="{ name: 'activities', params: { id: trip.id } }"
            class="link"
        >
            <ul class="propertyList">
                <template v-for="(value, key) in formattedTrips">
                    <li v-if="value !== null" class="info">
                        <h2>{{ key }}</h2>
                        <p v-if="Array.isArray(value)">
                            {{ tripstore.formatAttendees(value) }}
                        </p>
                        <p v-else>{{ value }}</p>
                    </li>
                </template>
            </ul>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import type { Trip } from './Interfaces';
import { RouterLink } from 'vue-router';
import { useTripStore } from '@/stores/trip';
import { computed, ref } from 'vue';

const props = defineProps<{
    trip: Trip;
}>();

const tripstore = useTripStore();
const confirmDeleteWindow = ref(false);

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

function confirmDelete(confirm: boolean) {
    if (confirm) {
        tripstore.deleteTrip(props.trip.id);
    }
    confirmDeleteWindow.value = false;
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
    background-color: var(--color-border);
    color: white;
}
.btn-row button:hover {
    background-color: var(--color-background);
}
.infoContainer {
    width: 100%;
    margin: 2rem auto;
    padding: 1rem;
    background-color: var(--color-background-soft);
    border-radius: 10px;
}
.info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
}
.propertyList {
    width: 60%;
    margin: auto;
}
h2 {
    margin-right: 10px;
}
h2::after {
    content: ':';
}
.link {
    width: 100%;
    height: 90%;
    margin: auto;
}
</style>
