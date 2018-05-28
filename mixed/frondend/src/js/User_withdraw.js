import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/User_withdraw.vue'
import $ from 'expose?$!jquery'
import store from '../add_js/User_withdrawStore'
import datetime from '../add_js/datetime'
import '../css/User_withdraw.less'
import vueResource from 'vue-resource'
require('../add_js/public.js')
Vue.use(vueResource);
new Vue({
	el: '#main',
	store,
	render: z => z(App),
});

datetime.rili();