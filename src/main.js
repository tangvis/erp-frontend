import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import './assets/main.css'
import store from './store'
import vuetify from './plugins/vuetify'
import '@/scss/style.scss'
import VueTablerIcons from "vue-tabler-icons";
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';


createApp(App)
.component('EasyDataTable', Vue3EasyDataTable)
.use(PerfectScrollbarPlugin)
.use(router)
.use(store)
.use(vuetify)
.use(VueTablerIcons)
.mount('#app')
