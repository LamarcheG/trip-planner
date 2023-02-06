import type { Trip } from '@/components/Trip/Interfaces';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/firebaseInit';
import {
    collection,
    onSnapshot,
    addDoc,
    serverTimestamp
} from 'firebase/firestore';
import { useUserStore } from './user';

export const useTripStore = defineStore('trip', () => {
    const trips = ref<Trip[]>([]);
    const currentUserUID = useUserStore().user?.uid;

    const tripCollection = collection(db, 'Users', currentUserUID, 'Trips');

    const unsubscribe = onSnapshot(tripCollection, (querySnapshot) => {
        trips.value = querySnapshot.docs.map((doc) => {
            return {
                title: doc.id,
                ...doc.data()
            } as Trip;
        });
    });
    // Unsubscribe from changes when user logs out
    useUserStore().user && unsubscribe();

    function addTrip(trip: Trip) {
        addDoc(tripCollection, {
            title: trip.title,
            description: trip.description,
            startDate: trip.startDate ? trip.startDate : serverTimestamp(),
            endDate: trip.endDate ? trip.endDate : serverTimestamp(),
            budget: trip.budget ? trip.budget : 0,
            attendees: trip.attendees ? trip.attendees : []
        });
    }

    return {
        trips,
        addTrip
    };
});
