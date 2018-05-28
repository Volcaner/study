import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {//页面状态
	/*showentrance:true,
	showmaintitle:false,
	showporc:false,
	showsubsucc:false,
	showentersucc:false,
	showenterfalse:false,
	showpc:'',//选择入驻类型，显示以及异常
	stoiId:'',//ajax获取个人
	stoicId:'',//公司Id
	userId:''//ajax获取*/
}
const mutations = {
}
const modulea={
	state:{
		picstate:['','','','','','','','']//图片状态不够再加为了组件的操作
	},
}
export default new Vuex.Store({
	state,
	modules:{
		a:modulea
	}
})