import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
// import ToastPlugin from 'vue-toast-notification';
import ArgonDashboard from "./argon-dashboard";
import VueGoogleMaps from '@fawmi/vue-google-maps'
// import 'vue-toast-notification/dist/theme-bootstrap.css';

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBoDtACSuU8JAx52d9D4fF3FJIduk5rEcw',
    },
});
// appInstance.use(ToastPlugin);
appInstance.mount("#app");
