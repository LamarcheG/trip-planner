import type { Activity } from '@/components/Activity/Interfaces';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { db } from '@/firebaseInit';
import { useUserStore } from './user';
import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot,
    type DocumentData
} from 'firebase/firestore';
import { FirebaseAuth } from '@/firebaseInit';
import type { Unsubscribe } from 'firebase/auth';
import { useTripStore } from './trip';

export const useActivityStore = defineStore('activity', () => {
    const activities = ref<Activity[]>([]);

    const currentUserUID = useUserStore().user?.uid;
    const currentTrip = useTripStore();

    const currentId = computed(() => {
        return currentTrip.activeTrip?.id;
    });

    var activityCollection: CollectionReference<DocumentData>;

    function fetchActivities() {
        activityCollection = collection(
            db,
            'Users',
            currentUserUID,
            'Trips',
            currentId.value!,
            'Activities'
        );
        var unsubscribe: Unsubscribe;

        FirebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                unsubscribe = onSnapshot(
                    activityCollection,
                    (querySnapshot) => {
                        activities.value = querySnapshot.docs.map((doc) => {
                            return {
                                id: doc.id,
                                ...doc.data()
                            } as Activity;
                        });
                    }
                );
            } else {
                unsubscribe && unsubscribe();
            }
        });
    }

    function addActivity(activity: Activity) {
        addDoc(activityCollection, {
            title: activity.title,
            description: activity.description,
            startDate: activity.startDate ? activity.startDate : null,
            endDate: activity.endDate ? activity.endDate : null,
            category: activity.category ? activity.category : null,
            address: activity.address ? activity.address : null,
            cost: activity.cost ? activity.cost : null,
            attendees:
                activity.attendees?.length || 0 > 0 ? activity.attendees : null
        });
    }

    function deleteActivity(activityId: string) {
        const activityDoc = doc(
            db,
            'Users',
            currentUserUID,
            'Trips',
            currentId.value!,
            'Activities',
            activityId
        );
        deleteDoc(activityDoc);
    }

    function updateActivity(activity: Activity) {
        const activityDoc = doc(
            db,
            'Users',
            currentUserUID,
            'Trips',
            currentId.value!,
            'Activities',
            activity.id
        );
        updateDoc(activityDoc, {
            title: activity.title,
            description: activity.description,
            startDate: activity.startDate ? activity.startDate : null,
            endDate: activity.endDate ? activity.endDate : null,
            category: activity.category ? activity.category : null,
            address: activity.address ? activity.address : null,
            cost: activity.cost ? activity.cost : null,
            attendees:
                activity.attendees?.length || 0 > 0 ? activity.attendees : null
        });
    }

    return {
        activities,
        currentId,
        fetchActivities,
        addActivity,
        deleteActivity,
        updateActivity
    };
});
