<template>
    <TripListItem v-for="trip in tripList" :key="trip.title" :trip="trip" />
</template>

<script setup lang="ts">
import type { Trip } from './Interfaces';
import TripListItem from './TripListItem.vue';

const props = defineProps<{
    tripList: Trip[];
}>();
</script>

<style scoped></style>
