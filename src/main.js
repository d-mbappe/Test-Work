import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from '../store'
// Font-awesome icon
import { library } from '@fortawesome/fontawesome-svg-core'

import { faUserSecret, faEdit, faTrash, faPlus, faMinus, faCheck, faArrowLeft, faArrowRight, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret, faEdit, faTrash, faPlus, faMinus, faCheck, faArrowLeft, faArrowRight, faSave)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
