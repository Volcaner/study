/*
*仓储-预存卡-退款申请
*/
import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/Storage_preMemoryCardRefund.vue'
import $ from 'expose?$!jquery'
import store from '../add_js/sPMCRefundStore'
import vueResource from 'vue-resource'
Vue.use(vueResource)
require("../css/preMemoryCard.less");
require('../add_js/public.js')

new Vue ({
	el : "#main",
	store,
	render : z=>z(App),
})