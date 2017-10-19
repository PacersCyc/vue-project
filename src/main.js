// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

import 'common/less/index.less'
//import 'common/less/icon.less'

Vue.config.productionTip = false
//全局注册VueRsource
Vue.use(VueResource)

/* eslint-disable no-new */
//上句注释是指vue在用new实例化时必须赋值给某个变量这一校验规则可被忽略
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
