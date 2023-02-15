<template>
    <div class="modal-backdrop">
        <div class="modal">
            <button
                type="button"
                class="btn-close"
                @click="$emit('close-modal')"
            >
                Close
            </button>
            <form @submit.prevent="createTrip" id="TripModal">
                <h1>Modify Trip</h1>
                <div class="inputField">
                    <label for="title">Title</label>
                    <input type="text" id="title" v-model="title" required />
                </div>
                <div class="inputField">
                    <label for="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        v-model="description"
                        required
                    />
                </div>
                <div class="inputField">
                    <label for="startDate">Start Date</label>
                    <input type="date" id="startDate" v-model="startDate" />
                </div>
                <div class="inputField">
                    <label for="endDate">End Date</label>
                    <input type="date" id="endDate" v-model="endDate" />
                </div>
                <div class="inputField">
                    <label for="budget">Budget</label>
                    <input type="number" id="budget" v-model="budget" />
                </div>
                <div class="inputField">
                    <label for="attendee">Attendees</label>
                    <input type="text" id="attendee" v-model="attendeeInput" />
                    <button @click="addAttendee" type="button">+</button>
                </div>
                <ul>
                    <li v-for="attendee in attendees">
                        {{ attendee }}
                    </li>
                </ul>
                <button type="submit" class="btn-submit" form="TripModal">
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTripStore } from '@/stores/trip';
import { onMounted, ref } from 'vue';
import type { Trip } from './Interfaces';

const props = defineProps<{
    trip: Trip;
}>();

const emit = defineEmits(['close-modal']);

const title = ref('');
const startDate = ref<Date>();
const endDate = ref<Date>();
const description = ref('');
const budget = ref(0);
const attendeeInput = ref('');
const attendees = ref<string[]>([]);

var trip = undefined;

onMounted(() => {
    if (props.trip) {
        title.value = props.trip.title;
        startDate.value = props.trip.startDate;
        endDate.value = props.trip.endDate;
        description.value = props.trip.description;
        budget.value = props.trip.budget ? props.trip.budget : 0;
        attendees.value = props.trip.attendees ? props.trip.attendees : [];
    }
});

function addAttendee() {
    attendees.value?.push(attendeeInput.value);
    attendeeInput.value = '';
}

function createTrip() {
    trip = {
        id: props.trip?.id,
        title: title.value,
        startDate: startDate.value,
        endDate: endDate.value,
        description: description.value,
        budget: budget.value,
        attendees: attendees.value
    } as Trip;

    useTripStore().updateTrip(trip);

    emit('close-modal');
}
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 100;
}
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    background-color: var(--color-background-soft);
    border-radius: 5px;
    z-index: 101;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
    background-color: var(--color-border);
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
#TripModal {
    margin: 3rem auto;
}
h1 {
    text-align: center;
    margin-bottom: 2rem;
}
.inputField {
    font-size: 1rem;
    width: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
}
label {
    margin-right: 1rem;
}
label::after {
    content: ':';
}
input,
select {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--color-background-soft);
    padding: 3rem 6rem;
    border-radius: 10px;
    width: 50%;
    margin: 0 auto;
}
.btn-submit {
    width: 12rem;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 1rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    background-color: var(--color-border);
    margin-top: 2rem;
}
</style>
