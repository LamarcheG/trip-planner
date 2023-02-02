<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import ActivityForm from '@/components/Activity/ActivityForm.vue';
import ActivityList from '@/components/Activity/ActivityList.vue';
import { useActivityStore } from '@/stores/activity';
import { useCollection, useDocument, useFirestore } from 'vuefire';
import { collection, doc } from '@firebase/firestore';

const db = useFirestore();
const userRef = useCollection(collection(db, 'Users'));
const user = useDocument(doc(db, 'Users', 'Z40F70yLLjojznBZ7dG9'));

const activities = useActivityStore().activities;
</script>

<template>
    <div>
        <ActivityForm />
        <ActivityList :activities="activities" />
        <ul>
            <li v-for="user in userRef" :key="user.id">
                {{ user.email }}
            </li>
        </ul>
    </div>
</template>
