<template>
    <TransitionGroup name="tripList" tag="ul" class="tripList"
        ><TripListItem v-for="trip in tripList" :key="trip.title" :trip="trip"
    /></TransitionGroup>
</template>

<script setup lang="ts">
import type { Trip } from './Interfaces';
import TripListItem from './TripListItem.vue';

const props = defineProps<{
    tripList: Trip[];
}>();
</script>

<style scoped>
.tripList {
    display: grid;
    padding: 0;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem 3rem;
    width: 50%;
    margin: 5rem auto;
}
.tripList-enter-active,
.tripList-leave-active {
    transition: all 0.5s ease;
}
.tripList-enter-from,
.tripList-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
