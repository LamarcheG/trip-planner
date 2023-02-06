<script setup lang="ts">
import ActivityForm from '@/components/Activity/ActivityForm.vue';
import ActivityList from '@/components/Activity/ActivityList.vue';
import { useActivityStore } from '@/stores/activity';
import TripForm from '@/components/Trip/TripForm.vue';
import TripList from '@/components/Trip/TripList.vue';
import { useTripStore } from '@/stores/trip';
import type { Trip } from '@/components/Trip/Interfaces';
import { onMounted } from 'vue';

const tripStore = useTripStore();
const activitiesStore = useActivityStore();
</script>

<template>
    <div>
        <TripForm />
        <TripList :tripList="tripStore.trips" />
        <ActivityForm />
        <ActivityList :activities="activitiesStore.activities" />
    </div>
</template>
