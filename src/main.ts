import { createApp } from 'vue'
import App from './App.vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// Import base styles
import './assets/main.css'
import i18n from './i18n'

// Setup Day.js
dayjs.extend(utc)
dayjs.extend(timezone)

createApp(App).use(i18n).mount('#app')