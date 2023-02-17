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
            <form @submit.prevent="createActivity" id="formModal">
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
                    <label for="attendee">Attendees</label>
                    <input type="text" id="attendee" v-model="attendeeInput" />
                    <button @click="addAttendee" type="button">+</button>
                </div>
                <ul>
                    <li v-for="attendee in attendees">
                        {{ attendee }}
                    </li>
                </ul>
                <button type="submit" class="btn-submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useActivityStore } from '@/stores/activity';
import { onMounted, ref } from 'vue';
import type { Activity } from './Interfaces';
import { ActivityCategory } from './Interfaces';

const props = defineProps<{
    activity: Activity;
}>();

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

const emit = defineEmits(['close-modal']);

onMounted(() => {
    title.value = props.activity.title;
    startDate.value = props.activity.startDate;
    endDate.value = props.activity.endDate;
    description.value = props.activity.description;
    category.value = props.activity.category;
    address.value = props.activity.address ? props.activity.address : '';
    cost.value = props.activity.cost ? props.activity.cost : 0;
    attendees.value = props.activity.attendees ? props.activity.attendees : [];
});

function createActivity() {
    activity = {
        id: props.activity?.id,
        title: title.value,
        startDate: startDate.value,
        endDate: endDate.value,
        description: description.value,
        category: category.value,
        address: address.value,
        cost: cost.value,
        attendees: attendees.value
    };

    useActivityStore().updateActivity(activity);

    emit('close-modal');
}

function addAttendee() {
    attendees.value?.push(attendeeInput.value);
    attendeeInput.value = '';
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
#formModal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--color-background-soft);
    padding: 3rem 6rem;
    border-radius: 10px;
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
