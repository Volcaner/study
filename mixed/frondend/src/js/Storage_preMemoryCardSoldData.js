/*
*仓储-预存卡-售出记录
*/
import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/Storage_preMemoryCardSoldData.vue'
import $ from 'expose?$!jquery'
import store from '../add_js/sPMCSoldDataStore'
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
