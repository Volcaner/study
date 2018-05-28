import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
	nowpage: 1,  // 当前显示的页数
	allpage: 1,  // 当前的总页数
	option: "1",  // 排序方式 1:使用时间 2:未使用金额 3:使用金额
	newOption: "1",
	pmcId: '',
	pmcRecordList: [],
	pmcInfo: {},
	totalUsedM: '',
};

const mutations = {
	page(state,n){
		state.nowpage=n.page;
	},
	setPmcId(state, id) {
		state.pmcId = id;
	},
	setData(state, res) {
		if(res && res.body) {
			let result = res.body;
			state.allpage = result.totalPage;
			state.pmcInfo = result.data?result.data:{};
			state.pmcRecordList = result.list;
			state.option = result.option;
			state.totalUsedM = result.useMoney;
		}
	},
	setOption(state, op) {
		state.newOption = op;
	},
};

const actions = {
	Ajax(context) {
		let url = '/yich/BusinessCardDetail';
		let params = {
			cardId: context.state.pmcId,
			page: context.state.nowpage,
			option: context.state.newOption,
		};
		Vue.http.post(url, params, {emulateJSON: true})
			.then(function(res) {
				window.checkErrorVue(res);
				context.commit('setData', res);
			}, function(error) {
				console.log(error);
			});
	},
};

export default new Vuex.Store({
	state,
	mutations,
	actions,
});