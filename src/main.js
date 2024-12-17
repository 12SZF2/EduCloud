import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router/router';
import { useThemeStore } from './stores/themeStore';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');

const themeStore = useThemeStore(); 
themeStore.setTheme(themeStore.currentTheme);

