import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//基本初始化样式
import './assets/style/reset.css'
import './assets/style/border.css'


//引入vant 
import 'vant/lib/index.css';
import './vant'


Vue.config.productionTip = false

//解决300ms延迟的fastClick
import fastClick from 'fastclick'
fastClick.attach(document.body);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
