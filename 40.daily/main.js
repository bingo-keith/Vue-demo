import Vue from 'vue';
import App from './app.vue';
import './style.css';
import VueI18n from 'vue-i18n'
import lang from './libs/index'

Vue.use(VueI18n)



const i18n = new VueI18n({
  locale: 'cn', //默认语言
  messages: lang
})

new Vue({
  el: '#app',
  i18n,
  render: h => {
    return h(App)
  }
})
