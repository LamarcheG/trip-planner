<template>
    <form @submit.prevent="createActivity" id="Activity">
        <h1>Activity</h1>
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
            <label for="category">Category</label>
            <select name="category" id="category" v-model="category">
                <option v-for="category in ActivityCategory" :value="category">
                    {{ category }}
                </option>
            </select>
        </div>
        <div class="inputField">
            <label for="address">Address</label>
            <input type="text" id="address" v-model="address" />
        </div>
        <div class="inputField">
            <label for="cost">Cost</label>
            <input type="number" id="cost" v-model="cost" />
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
        <button type="submit" class="btn-submit" form="Activity">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { useActivityStore } from '@/stores/activity';
import { ref } from 'vue';
import { ActivityCategory } from './Interfaces';

const title = ref('');
const startDate = ref<Date>();
const endDate = ref<Date>();
const description = ref('');
const category = ref<ActivityCategory>();
const address = ref('');
const cost = ref(0);
const attendeeInput = ref('');
const attendees = ref<string[]>([]);

var activity = undefined;

function createActivity() {
    activity = {
        title: title.value,
        startDate: startDate.value,
        endDate: endDate.value,
        description: description.value,
        category: category.value,
        address: address.value,
        cost: cost.value,
        attendees: attendees.value
    };

    useActivityStore().addActivity(activity);

    resetForm();
}
function resetForm() {
    title.value = '';
    startDate.value = undefined;
    endDate.value = undefined;
    description.value = '';
    category.value = undefined;
    address.value = '';
    cost.value = 0;
    attendeeInput.value = '';
    attendees.value = [];
}
function addAttendee() {
    attendees.value?.push(attendeeInput.value);
    attendeeInput.value = '';
}
</script>

<style scoped>
#Activity {
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
