<template>
    <div>
        <TripForm />
        <TripList :tripList="tripStore.trips" />
    </div>
</template>

<script setup lang="ts">
import TripForm from '@/components/Trip/TripForm.vue';
import TripList from '@/components/Trip/TripList.vue';
import { useTripStore } from '@/stores/trip';

const tripStore = useTripStore();
</script>

<style scoped></style>
