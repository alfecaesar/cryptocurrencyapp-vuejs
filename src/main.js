// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Posts from './components/CryptoList'
import CryptoDetail from './components/CryptoDetail'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueChartkick, {adapter: Chart})


Vue.use(VueRouter)

const routes = [
    {
        path: '/', 
        name: 'Home',
        component: Posts   
    },
    {
        path: '/cryptodetail', 
        name: 'CryptoDetail',
        component: CryptoDetail,
        props: true
    }
]

const router = new VueRouter({routes: routes})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'
})
