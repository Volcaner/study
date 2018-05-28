/*预存卡*/
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const state = {
	userid: false,
	pclist: {},
	option: "1",
	newOption: "1",
}

const mutations = {
	setPcList(state, pclist) {
		if(pclist) {
			state.pclist = pclist;
		}
	},
	setNewOption(state, op) {
		state.newOption = op;
	},
	setOption(state, op) {
		if(op) {
			state.option = op;
		}
	},
}

const actions = {

}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})