<template>
    <div>
        <div class="infoContainer">
            <h1>{{ capitalizedTitle }}</h1>
            <ul>
                <div v-for="(value, key) in activeTrip">
                    <li v-if="value !== null" class="info">
                        <h2>{{ key }}</h2>
                        <p v-if="Array.isArray(value)">
                            {{ tripStore.formatAttendees(value) }}
                        </p>
                        <p v-else>{{ value }}</p>
                    </li>
                </div>
            </ul>
        </div>
        <ActivityForm />
        <ActivityList :activities="activitiesStore.activities" />
    </div>
</template>

<script setup lang="ts">
import ActivityForm from '@/components/Activity/ActivityForm.vue';
import ActivityList from '@/components/Activity/ActivityList.vue';
import { useActivityStore } from '@/stores/activity';
import { useTripStore } from '@/stores/trip';
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';

const tripStore = useTripStore();
const activitiesStore = useActivityStore();
const route = useRoute();

const capitalizedTitle = computed(() => {
    if (!tripStore.activeTrip) return;
    return (
        tripStore.activeTrip.title.charAt(0).toUpperCase() +
        tripStore.activeTrip.title.slice(1)
    );
});

const activeTrip = computed(() => {
    if (Array.isArray(route.params.id)) {
        return '0';
    } else {
        tripStore.setActiveTrip(route.params.id);
        const trip = tripStore.activeTrip;
        const orderedTrip = {
            description: trip?.description,
            startDate: trip?.startDate,
            endDate: trip?.endDate,
            budget: trip?.budget,
            attendees: trip?.attendees
        };
        return orderedTrip;
    }
});

onMounted(() => {
    activitiesStore.fetchActivities();
});
</script>

<style scoped>
h1 {
    text-align: center;
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
