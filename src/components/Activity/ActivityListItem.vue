<template>
    <div class="infoContainer">
        <ul>
            <li v-for="(value, key) in activity" class="info">
                <h2>{{ key }}</h2>
                <p>{{ value }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { Activity } from './Interfaces';

const props = defineProps<{
    activity: Activity;
}>();
</script>

<style scoped>
.infoContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
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
