<template>
    <div>
        <ActivityForm />
        <ActivityList :activities="activitiesStore.activities" />
    </div>
</template>

<script setup lang="ts">
import ActivityForm from '@/components/Activity/ActivityForm.vue';
import ActivityList from '@/components/Activity/ActivityList.vue';
import { useActivityStore } from '@/stores/activity';
import { useRoute } from 'vue-router';
const activitiesStore = useActivityStore();
const route = useRoute();

console.log(route.params.id);
</script>

<style scoped></style>
