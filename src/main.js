import { createApp } from 'vue'
import { VueHeadMixin, createHead } from '@unhead/vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const head = createHead()

app.use(router)
// add options API support
app.mixin(VueHeadMixin)
app.use(head)

app.mount('#app')
