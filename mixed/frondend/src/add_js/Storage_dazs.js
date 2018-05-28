import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
    show:false,
		
 }
const mutations = {
  alert(state){
  	state.show=true;
  },
  qxalert(state){
  	state.show=false;
  }
}

const actions={
 
	}
export default new Vuex.Store({
	state,
	mutations,
	actions
 })
