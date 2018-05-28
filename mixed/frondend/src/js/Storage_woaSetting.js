/**
 * 仓储-公众号设置
 */

import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/Storage_woaSetting.vue'
import $ from 'expose?$!jquery'
import store from '../add_js/Storage_woaSettingStore.js'
import vueResource from 'vue-resource'
Vue.use(vueResource)
require("../css/Storage_woaSetting.less")
require("../add_js/public.js")

new Vue({
	el: "#main",
	store,
	render: z=>z(App),
})