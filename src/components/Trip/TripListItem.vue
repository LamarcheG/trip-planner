<template>
    <RouterLink :to="{ name: 'activities', params: { id: trip.title } }">
        <ul class="infoContainer">
            <div v-for="(value, key) in trip">
                <li v-if="value !== null" class="info">
                    <h2>{{ key }}</h2>
                    <p v-if="Array.isArray(value)">
                        {{ tripstore.formatAttendees(value) }}
                    </p>
                    <p v-else>{{ value }}</p>
                </li>
            </div>
        </ul>
    </RouterLink>
</template>

<script setup lang="ts">
import type { Trip } from './Interfaces';
import { RouterLink } from 'vue-router';
import { useTripStore } from '@/stores/trip';

const tripstore = useTripStore();

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
