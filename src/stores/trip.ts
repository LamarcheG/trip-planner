import type { Trip } from '@/components/Trip/Interfaces';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/firebaseInit';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { useUserStore } from './user';
import { FirebaseAuth } from '@/firebaseInit';
import type { Unsubscribe } from 'firebase/auth';

export const useTripStore = defineStore('trip', () => {
    const trips = ref<Trip[]>([]);

    const currentUserUID = useUserStore().user?.uid;
    const tripCollection = collection(db, 'Users', currentUserUID, 'Trips');

    var unsubscribe: Unsubscribe;

    FirebaseAuth.onAuthStateChanged((user) => {
        if (user) {
            unsubscribe = onSnapshot(tripCollection, (querySnapshot) => {
                trips.value = querySnapshot.docs.map((doc) => {
                    return {
                        title: doc.id,
                        ...doc.data()
                    } as Trip;
                });
            });
        } else {
            unsubscribe && unsubscribe();
        }
    });

    function addTrip(trip: Trip) {
        addDoc(tripCollection, {
            title: trip.title,
            description: trip.description,
            startDate: trip.startDate ? trip.startDate : null,
            endDate: trip.endDate ? trip.endDate : null,
            budget: trip.budget ? trip.budget : null,
            attendees: trip.attendees?.length || 0 > 0 ? trip.attendees : null
        });
    }

    function getActiveTrip(id: string) {
        return trips.value.find((trip) => trip.title === id);
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

    return {
        trips,
        addTrip,
        getActiveTrip,
        formatAttendees
    };
});
