import type { Activity } from '@/components/Activity/Interfaces';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useActivityStore = defineStore('activity', () => {
    const activities = ref<Activity[]>([]);

    function addActivity(activity: Activity) {
        activities.value.push(activity);
    }

    return {
        activities,
        addActivity
    };
});
