import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {//页面状态
	page1:true,
	page2:false,
	page3:false,
	page4:false,
	page5:false,
	page6:false
}
export default new Vuex.Store({
	state,
})