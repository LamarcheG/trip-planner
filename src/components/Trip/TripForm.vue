<template>
    <form @submit.prevent="createTrip" id="Trip">
        <h1>Trip</h1>
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
        <button type="submit" class="btn-submit" form="Trip">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { useTripStore } from '@/stores/trip';
import { ref } from 'vue';
import type { Trip } from './Interfaces';

const title = ref('');
const startDate = ref<Date>();
const endDate = ref<Date>();
const description = ref('');
const budget = ref(0);
const attendeeInput = ref('');
const attendees = ref<string[]>([]);

var trip = undefined;

function createTrip() {
    trip = {
        title: title.value,
        startDate: startDate.value,
        endDate: endDate.value,
        description: description.value,
        budget: budget.value,
        attendees: attendees.value
    } as Trip;

    useTripStore().addTrip(trip);

    resetForm();
}

function resetForm() {
    title.value = '';
    startDate.value = undefined;
    endDate.value = undefined;
    description.value = '';
    budget.value = 0;
    attendeeInput.value = '';
    attendees.value = [];
}

function addAttendee() {
    attendees.value?.push(attendeeInput.value);
    attendeeInput.value = '';
}
</script>

<style scoped>
#Trip {
    margin: 3rem auto;
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
    background-color: #202020;
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
    background-color: #313438;
    margin-top: 2rem;
}
</style>
