import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/app.scss'
import FirebaseVue from './firebase'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import Axios from 'axios'
import Stringify from 'vue-stringify'

Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
Vue.use(FirebaseVue)
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
