<template>
    <li class="infoContainer">
        <div class="btn-row">
            <button type="button" @click="modifyItem">Modify</button>
            <button
                type="button"
                v-if="!confirmDeleteWindow"
                @click="() => (confirmDeleteWindow = !confirmDeleteWindow)"
            >
                X
            </button>
            <div v-if="confirmDeleteWindow">
                <button type="button" @click="confirmDelete(true)">
                    Delete
                </button>
                <button type="button" @click="confirmDelete(false)">
                    Cancel
                </button>
            </div>
        </div>
        <ul v-for="(value, key) in formattedActivities">
            <li v-if="value !== null" class="info">
                <h2>{{ key }}</h2>
                <p v-if="Array.isArray(value)">
                    {{ formatAttendees(value) }}
                </p>
                <p v-else>{{ value }}</p>
            </li>
        </ul>
        <ActvityModifyModal
            v-show="showModal"
            @close-modal="closeModal"
            :activity="activity"
        />
    </li>
</template>

<script setup lang="ts">
import type { Activity } from './Interfaces';
import { computed, ref } from 'vue';
import { useActivityStore } from '@/stores/activity';
import ActvityModifyModal from './ActivityModifyModal.vue';

const confirmDeleteWindow = ref(false);
const activitystore = useActivityStore();
const showModal = ref(false);

const props = defineProps<{
    activity: Activity;
}>();

function modifyItem() {
    showModal.value = true;
}
function closeModal() {
    showModal.value = false;
}
function confirmDelete(confirm: boolean) {
    if (confirm) {
        activitystore.deleteActivity(props.activity.id);
    }
    confirmDeleteWindow.value = false;
}
function formatAttendees(attendees: string[]) {
    // display as Person1, Person2 and Person3
    if (attendees.length === 1) {
        return attendees[0];
    } else if (attendees.length === 2) {
        return attendees[0] + ' and ' + attendees[1];
    } else if (attendees.length > 2) {
        return attendees[0] + ', ' + attendees[1] + ' and ' + attendees[2];
    }
}

const formattedActivities = computed(() => {
    const orderedActivity = {
        title: props.activity?.title,
        description: props.activity?.description,
        categpry: props.activity?.category,
        cost: props.activity?.cost,
        startDate: props.activity?.startDate,
        endDate: props.activity?.endDate,
        attendees: props.activity?.attendees
    };
    return orderedActivity;
});
</script>

<style scoped>
.btn-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.btn-row button {
    padding: 10px 20px;
    height: 2rem;
    border-radius: 5px;
    border: none;
    background-color: var(--color-border);
    color: white;
}
.btn-row button:hover {
    background-color: var(--color-background);
}
.infoContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 2rem;
    background-color: var(--color-background-soft);
    border-radius: 10px;
    color: var(--color-text);
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
