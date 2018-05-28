/**
 * 预存卡
 */
import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/Storage_pmcDetail.vue'
import $ from 'expose?$!jquery'
import store from '../add_js/Storage_pmcDetailStore'
import vueResource from 'vue-resource'
Vue.use(vueResource)
require("../css/Storage_pmcDetail.less");
require('../add_js/public.js')
new Vue ({
	el : "#main",
	store,
	render : z=>z(App),
})