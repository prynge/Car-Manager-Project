import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

// import './assets/js/bootstrap.js'
import './assets/fontawesome/css/fontawesome.css'
import './assets/fontawesome/css/solid.css'
import './assets/css/bootstrap.css'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import './assets/js/bootstrap.bundle.js'

createApp(App)
.use(router)
.use(store)
.mount('#app')
