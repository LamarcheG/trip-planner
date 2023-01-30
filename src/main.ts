import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebaseInit';

import App from './App.vue';
import router from './router';
import './style.css';

import './assets/main.css';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
        // we will see other modules later on
        VueFireAuth()
    ]
});
app.mount('#app');
