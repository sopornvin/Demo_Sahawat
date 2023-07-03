import { createApp } from 'vue'

// Vuetify
import { vuetify } from './plugins/vuetify'
// Custom CSS
import "./styles/global.scss"
import App from './App.vue'
// Import Pinia
import { createPinia } from 'pinia'

// Import Router
import router from './router/index'

//Import axios
// import axios from 'axios';

import 'sweetalert2/dist/sweetalert2.min.css'


const app = createApp(App)
app.use(vuetify)
// app.use(i18n)
// app.use(axios)
app.use(createPinia())
app.use(router)
app.mount('#app')