import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { firebaseApp } from './firebaseInit'; // do not remove this line

import App from './App.vue';
import router from './router';
import './style.css';

import './assets/main.css';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');
