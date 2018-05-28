/**
 * 预存卡
 */
import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/User_preMemoryCard.vue'
import $ from 'expose?$!jquery'
import store from '../add_js/User_preMemoryCardStore'
import vueResource from 'vue-resource'
Vue.use(vueResource)
require("../css/User_preMemoryCard.less");
require('../add_js/public.js')
new Vue ({
	el : "#main",
	store,
	render : z=>z(App),
})