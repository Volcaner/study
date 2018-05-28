/**
 * 预存卡
 */
import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/Storage_pmcCardNoRecord.vue'
import $ from 'expose?$!jquery'
import store from '../add_js/Storage_pmcCardNoRecordStore'
import vueResource from 'vue-resource'
Vue.use(vueResource)
require("../css/Storage_pmcCardNoRecord.less");
require('../add_js/public.js')
new Vue ({
	el : "#main",
	store,
	render : z=>z(App),
})