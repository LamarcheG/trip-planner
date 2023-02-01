<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import ActivityForm from '@/components/Activity/ActivityForm.vue';
import ActivityList from '@/components/Activity/ActivityList.vue';
import {
    ActivityCategory,
    type Activity
} from '@/components/Activity/Interfaces';
import { ref } from 'vue';
import { useActivityStore } from '@/stores/activity';

const userStore = useUserStore().user;

const activities = useActivityStore().activities;
</script>

<template>
    <div>
        <ActivityForm />
        <ActivityList :activities="activities" />
    </div>
</template>
