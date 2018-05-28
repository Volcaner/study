import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	nowpage: 1,  // 当前显示的页数
	allpage: 1,  // 当前的总页数
	option: "5",  // 排序方式 1:已用 2:已用倒序 3:未用 4:未用倒序 5:售出时间 6:售出时间倒序
	newOption: "5",
	pmcId: '',
	pmcSoldNo: '',
	pmcInfo: {},
	pmcRecordList: [],
}
const mutations = {		
	page(state,n){
		state.nowpage=n.page;
	},
	setData(state, res) {
		if(res && res.body) {
			let result = res.body;
			state.allpage = result.PageCount;
			state.pmcInfo = result.pc;
			state.pmcRecordList = result.list;
			state.option = result.option;
		}
	},
	setOption(state, op) {
		state.newOption = op;
	},
	setPmcId(state, id) {
		state.pmcId = id;
	},
	setPmcSoldId(state, no) {
		state.pmcSoldNo = no;
	},
}
const actions={
	Ajax(context){
		let url = "/yich/SoldCardServlet";
		let params = {
			prestore_card_id: context.state.pmcId,
			prestore_card_sold_id: context.state.pmcSoldNo,
			option: context.state.newOption,
			page: context.state.nowpage,
		};
		Vue.http.post(url, params, {emulateJSON: true}).then(function(res) {
			window.checkErrorVue(res);
			context.commit('setData', res);
		}, function(error) {
			console.log(error);
		});
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})