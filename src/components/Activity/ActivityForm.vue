<template>
    <div>
        <form @submit.prevent="createActivity">
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
            <div class="dateSection">
                <div class="inputField">
                    <label for="startDate">Start Date</label>
                    <input type="date" id="startDate" v-model="startDate" />
                </div>
                <div class="inputField">
                    <label for="endDate">End Date</label>
                    <input type="date" id="endDate" v-model="endDate" />
                </div>
            </div>
            <div class="inputField">
                <label for="category">Category</label>
                <select name="category" id="category" v-model="category">
                    <option
                        v-for="category in ActivityCategory"
                        :value="category"
                    >
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
                <label for="attendees">Attendees</label>
                <input type="text" id="attendees" v-model="attendees" />
            </div>
            <button type="submit">Submit</button>
        </form>
        <p>{{ title }}</p>
        <p>{{ startDate }}</p>
        <p>{{ endDate }}</p>
        <p>{{ description }}</p>
        <p>{{ category }}</p>
        <p>{{ address }}</p>
        <p>{{ cost }}</p>
        <p>{{ attendees }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Activity } from './Interfaces';

enum ActivityCategory {
    Business = 'Business',
    Entertainment = 'Entertainment',
    Food = 'Food',
    Drinks = 'Drinks',
    Culture = 'Culture',
    Music = 'Music',
    Health = 'Health',
    Hobbies = 'Hobbies',
    Shopping = 'Shopping',
    Sports = 'Sports',
    Travel = 'Travel'
}

const title = ref('');
const startDate = ref<Date>();
const endDate = ref<Date>();
const description = ref('');
const category = ref<ActivityCategory>();
const address = ref('');
const cost = ref(0);
const attendees = ref<string[]>();

const activity = ref<Activity>();

function createActivity() {
    activity.value = {
        title: title.value,
        startDate: startDate.value,
        endDate: endDate.value,
        description: description.value,
        category: category.value,
        address: address.value,
        cost: cost.value,
        attendees: attendees.value
    };

    console.log(activity.value);
}
</script>

<style scoped>
.dateSection {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
}
.inputField {
    margin-top: 1rem;
    font-size: 1rem;
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
    width: 70%;
}
button {
    width: 12rem;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 1rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 0.75rem;
    background-color: #313438;
}
</style>
