/*
*商户-预存卡-使用数据
*/
import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/User_preMemoryCardUseData.vue'
import $ from 'expose?$!jquery'
import store from '../add_js/uPMCUseDataStore'
import vueResource from 'vue-resource'
import datetime from '../add_js/datetime'
Vue.use(vueResource)
require("../css/preMemoryCard.less");
require('../add_js/public.js')

new Vue ({
	el : "#main",
	store,
	render : z=>z(App),
})
datetime.rili();