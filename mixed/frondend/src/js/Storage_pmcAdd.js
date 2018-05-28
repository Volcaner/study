/**
 * 预存卡
 */
import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/Storage_pmcAdd.vue'
import $ from 'expose?$!jquery'
import store from '../add_js/Storage_pmcAddStore'
import vueResource from 'vue-resource'
Vue.use(vueResource)
require("../css/Storage_pmcAdd.less");
require('../add_js/public.js')
new Vue ({
	el : "#main",
	store,
	render : z=>z(App),
})