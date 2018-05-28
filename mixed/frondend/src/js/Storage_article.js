/**
 * 仓储-公众号设置
 */

import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/Storage_article.vue'
import $ from 'expose?$!jquery'
import store from '../add_js/Storage_articleStore.js'
import vueResource from 'vue-resource'
Vue.use(vueResource)
require("../css/Storage_article.less")
require("../add_js/public.js")

require('froala-editor/js/froala_editor.pkgd.min')
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)

new Vue({
	el: "#main",
	store,
	render: z=>z(App),
})