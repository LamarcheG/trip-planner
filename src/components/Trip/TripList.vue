<template>
    <TripListItem v-for="trip in trips" :key="trip.title" :trip="trip" />
</template>

<script setup lang="ts">
import type { Trip } from './Interfaces';
import TripListItem from './TripListItem.vue';

const props = defineProps<{
    trips: Trip[];
}>();
</script>

<style scoped></style>
