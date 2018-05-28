/*预存卡*/
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const state = {
	isModalDisplay: false,
	state: "s1",
	sortV: "1",
	nowSortV: "1",
	sortInv: "1",
	nowSortInv: "1",
	supNameV: "",
	supNameInv: "",
	pclistV: [],
	pclistInv: [],
	supNameListV: [],
	supNameListInv: [],
}

const mutations = {
	showModal(state) {
		state.isModalDisplay = true;
	},
	closeModal(state) {
		state.isModalDisplay = false;
	},
	changestate(state, str) {
		state.state = str;
	},
	setPclist(state, pc) {
		if("s1" == state.state) {
			state.pclistV = pc;
		}
		else if("s2" == state.state) {
			state.pclistInv = pc;
		}
	},
	setSort(state, sort) {
		if("s1" == state.state) {
			state.sortV = sort;
		}
		else if("s2" == state.state) {
			state.sortInv = sort;
		}
	},
	setNowSort(state, sort) {
		if("s1" == state.state) {
			state.nowSortV = sort;
		}
		else if("s2" == state.state) {
			state.nowSortInv = sort;
		}
	},
	setSupName(state, supName) {
		if("s1" == state.state) {
			state.supNameV = supName;
		}
		else if("s2" == state.state) {
			state.supNameInv = supName;
		}
	},
	setSupNameList(state, supNameList) {
		if("s1" == state.state) {
			state.supNameListV = supNameList;
		}
		else if("s2" == state.state) {
			state.supNameListInv = supNameList;
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