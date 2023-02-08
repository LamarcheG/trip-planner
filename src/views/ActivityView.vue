<template>
    <div>
        <ul class="infoContainer">
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
import { computed } from 'vue';

const tripStore = useTripStore();
const activitiesStore = useActivityStore();
const route = useRoute();

const activities = computed(() => {
    return activitiesStore.activities;
});

const activeTrip = computed(() => {
    if (Array.isArray(route.params.id)) {
        return '0';
    } else {
        var trip = tripStore.getActiveTrip(route.params.id);
        const orderedTrip = {
            title: trip?.title,
            description: trip?.description,
            startDate: trip?.startDate,
            endDate: trip?.endDate,
            budget: trip?.budget,
            attendees: trip?.attendees
        };
        return orderedTrip;
    }
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
