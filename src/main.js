import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
// import ToastPlugin from 'vue-toast-notification';
import ArgonDashboard from "./argon-dashboard";
// import 'vue-toast-notification/dist/theme-bootstrap.css';

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
// appInstance.use(ToastPlugin);
appInstance.mount("#app");
