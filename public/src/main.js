import Vue from 'vue'
import App from './app'
import router from 'js/router'
import 'js/vue/filters';

Vue.config.productionTip = false

const app = new Vue({
  router,
  el: '#app',
  render: h => h(App)
})

export default app;