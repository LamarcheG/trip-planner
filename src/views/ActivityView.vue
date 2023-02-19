<template>
    <div>
        <div class="infoContainer">
            <div class="btn-row">
                <button type="button" @click="modifyTrip" class="btn-modify">
                    Modify
                </button>
            </div>
            <h1>{{ capitalizedTitle }}</h1>
            <ul class="tripProperties">
                <template v-for="(value, key) in activeTrip">
                    <li v-if="value !== null" class="info">
                        <h2>{{ key }}</h2>
                        <p v-if="Array.isArray(value)">
                            {{ tripStore.formatAttendees(value) }}
                        </p>
                        <p v-else>{{ value }}</p>
                    </li>
                </template>
            </ul>
        </div>
        <div class="centered">
            <p :class="{ budgetExceeded: budgetIsExceeded }" class="budget">
                Remaining Budget: {{ remainingBudget }}
            </p>
        </div>
        <ActivityList :activities="activitiesStore.activities" />
        <ActivityForm v-if="showForm" @close-form="closeForm" />
        <div class="centered">
            <button
                v-if="!showForm"
                type="button"
                @click="showForm = !showForm"
                class="btn-add"
            >
                Add Activity
            </button>
        </div>
        <TripModifyModal
            :trip="trip"
            v-show="showModal"
            @close-modal="closeModal"
        />
    </div>
</template>

<script setup lang="ts">
import ActivityForm from '@/components/Activity/ActivityForm.vue';
import ActivityList from '@/components/Activity/ActivityList.vue';
import { useActivityStore } from '@/stores/activity';
import { useTripStore } from '@/stores/trip';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import TripModifyModal from '@/components/Trip/TripModifyModal.vue';

const tripStore = useTripStore();
const activitiesStore = useActivityStore();
const route = useRoute();
const showModal = ref(false);
const showForm = ref(false);

function modifyTrip() {
    showModal.value = true;
}

function closeModal() {
    showModal.value = false;
}

function closeForm() {
    showForm.value = false;
}

const capitalizedTitle = computed(() => {
    if (!tripStore.activeTrip) return;
    return (
        tripStore.activeTrip.title.charAt(0).toUpperCase() +
        tripStore.activeTrip.title.slice(1)
    );
});

const trip = computed(() => {
    return tripStore.activeTrip!;
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

const remainingBudget = computed(() => {
    return calculateRemainingBudget();
});

const budgetIsExceeded = computed(() => {
    return remainingBudget.value < 0;
});

function calculateRemainingBudget() {
    if (!tripStore.activeTrip) return 0;

    let totalExpenses = 0;
    activitiesStore.activities.forEach((activity) => {
        totalExpenses += activity.cost ? activity.cost : 0;
    });
    return tripStore.activeTrip.budget! - totalExpenses!;
}

onMounted(() => {
    activitiesStore.fetchActivities();
});
</script>

<style scoped>
.budget {
    font-size: 2rem;
}
.centered {
    display: flex;
    justify-content: center;
}
.btn-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.btn-modify {
    background-color: var(--color-border);
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 5px;
}
.btn-add {
    background-color: var(--color-background-soft);
    color: white;
    border: none;
    cursor: pointer;
    font-size: larger;
    padding: 20px 30px;
    border-radius: 5px;
    border: 2px solid hsla(160, 100%, 37%, 1);
}
h1 {
    text-align: center;
    margin-bottom: 1rem;
}
.infoContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    margin: 5rem auto;
    padding: 1rem;
    background-color: var(--color-background-soft);
    border-radius: 10px;
}
.tripProperties {
    width: 35%;
    margin: auto;
}
.info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    min-height: 3rem;
    height: 100%;
}
h2 {
    margin-right: 10px;
}
h2::after {
    content: ':';
}
.budgetExceeded {
    color: red;
}
</style>
