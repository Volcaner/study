/*预存卡*/
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const state = {
	isModalDisplay: false,
	pclist: {},
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