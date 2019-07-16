import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/app.scss'
import FirebaseVue from './firebase'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import Stringify from 'vue-stringify'
import moment from 'moment'

Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
Vue.use(require('vue-moment'));
Vue.use(FirebaseVue)
Vue.config.productionTip = false


Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
