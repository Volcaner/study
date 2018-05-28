/**
 * 预存卡购买页面
 */
import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/Storage_pmcOffShelf.vue'
import $ from 'expose?$!jquery'
import store from '../add_js/Storage_pmcOffShelfStore'
import vueResource from 'vue-resource'
Vue.use(vueResource)
require("../css/Storage_pmcOffShelf.less");
require('../add_js/public.js')
new Vue ({
	el : "#main",
	store,
	render : z=>z(App),
})