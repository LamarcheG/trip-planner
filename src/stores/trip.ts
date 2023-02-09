import type { Trip } from '@/components/Trip/Interfaces';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { db } from '@/firebaseInit';
import {
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    updateDoc
} from 'firebase/firestore';
import { useUserStore } from './user';
import { FirebaseAuth } from '@/firebaseInit';
import type { Unsubscribe } from 'firebase/auth';

export const useTripStore = defineStore('trip', () => {
    const trips = ref<Trip[]>([]);
    const activeTrip = ref<Trip>();

    const currentUserUID = useUserStore().user?.uid;
    const tripCollection = collection(db, 'Users', currentUserUID, 'Trips');

    var unsubscribe: Unsubscribe;

    FirebaseAuth.onAuthStateChanged((user) => {
        if (user) {
            unsubscribe = onSnapshot(tripCollection, (querySnapshot) => {
                trips.value = querySnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
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

    function deleteTrip(tripId: string) {
        //delete subcollection
        const tripDoc = doc(db, 'Users', currentUserUID, 'Trips', tripId);
        const activityCollection = collection(tripDoc, 'Activities');
        //delete all activities
        const unsub = onSnapshot(activityCollection, (querySnapshot) => {
            querySnapshot.docs.forEach((document) => {
                deleteDoc(
                    doc(
                        db,
                        'Users',
                        currentUserUID,
                        'Trips',
                        tripId,
                        'Activities',
                        document.id
                    )
                );
            });
        });
        deleteDoc(doc(db, 'Users', currentUserUID, 'Trips', tripId));
        unsub();
    }

    function updateTrip(trip: Trip) {
        updateDoc(doc(db, 'Users', currentUserUID, 'Trips', trip.id), {
            title: trip.title,
            description: trip.description,
            startDate: trip.startDate ? trip.startDate : null,
            endDate: trip.endDate ? trip.endDate : null,
            budget: trip.budget ? trip.budget : null,
            attendees: trip.attendees?.length || 0 > 0 ? trip.attendees : null
        });
    }

    function setActiveTrip(title: string) {
        activeTrip.value = trips.value.find((trip) => trip.title === title);
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
        activeTrip,
        addTrip,
        deleteTrip,
        updateTrip,
        setActiveTrip,
        formatAttendees
    };
});
