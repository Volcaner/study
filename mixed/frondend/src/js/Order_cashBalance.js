import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/Order_cashBalance.vue'
import $ from 'expose?$!jquery'
import store from '../add_js/Order_cashBalanceStore'
import vueResource from 'vue-resource'
import datetime from '../add_js/datetime'
import '../add_js/public2'
require("../css/Order_cashBalance.less");
require('../add_js/public.js')
Vue.use(vueResource);
new Vue({
	el: '#main',
	store,
	render: z => z(App),
});
datetime.rili();