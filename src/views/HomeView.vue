<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import ActivityForm from '@/components/Activity/ActivityForm.vue';
import ActivityList from '@/components/Activity/ActivityList.vue';
import { useActivityStore } from '@/stores/activity';
import { useCollection, useDocument, useFirestore } from 'vuefire';
import { collection, doc } from '@firebase/firestore';
import TripForm from '@/components/Trip/TripForm.vue';
import TripList from '@/components/Trip/TripList.vue';
import { useTripStore } from '@/stores/trip';

const db = useFirestore();
const userRef = useCollection(collection(db, 'Users'));
const user = useDocument(doc(db, 'Users', useUserStore().user?.uid));

const trips = useTripStore().trips;
const activities = useActivityStore().activities;
</script>

<template>
    <div>
        <TripForm />
        <TripList :trips="trips" />
        <ActivityForm />
        <ActivityList :activities="activities" />
        <div>
            <h1>User</h1>
            <ul>
                <li v-for="(value, key) in user">{{ key }}: {{ value }}</li>
            </ul>
        </div>
    </div>
</template>
