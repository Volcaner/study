/**
 * 预存卡购买页面
 */
import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/Storage_pmcPage.vue'
import $ from 'expose?$!jquery'
import store from '../add_js/Storage_pmcPageStore'
import vueResource from 'vue-resource'
Vue.use(vueResource)
require("../css/Storage_pmcPage.less");
require("../css/storageCenter.less");
require('../add_js/public');
require('../add_js/public2');
new Vue ({
	el : "#main",
	store,
	render : z=>z(App),
})