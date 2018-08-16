import Vue from 'vue'
import App from './App'
import Fetch from "./fetch"
import router from './router'
import "./assets/style/reset.css";
import ElementUi from "element-ui";
import 'element-ui/lib/theme-chalk/base.css';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUi);

Vue.prototype.$axios=Fetch;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
