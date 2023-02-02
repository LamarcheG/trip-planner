import type { Trip } from '@/components/Trip/Interfaces';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTripStore = defineStore('trip', () => {
    const trips = ref<Trip[]>([]);

    function addTrip(trip: Trip) {
        trips.value.push(trip);
    }

    return {
        trips,
        addTrip
    };
});
