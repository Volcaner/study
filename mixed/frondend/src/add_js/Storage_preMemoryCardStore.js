/*预存卡*/
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const state = {
	isModalDisplay: false,
	pclist: {},
	count: '',
}

const mutations = {
	showModal(state) {
		state.isModalDisplay = true;
	},
	closeModal(state) {
		state.isModalDisplay = false;
	},
	setPcList(state, pclist) {
		if(pclist) {
			state.pclist = pclist;
		}
	},
	setCount(state, count) {
		state.count = count;
	},
}

const actions = {
	Ajax(context) {

	},
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})