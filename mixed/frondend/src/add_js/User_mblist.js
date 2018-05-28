import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
   name:'',
   page:1,	
   allpage:0,
   list:'',
 }
const mutations = {
		page(state,n){
			state.page=n.page;
		},
}

const actions={
		Ajax(context){
			var obj={};
			obj.name=context.state.name;
			obj.page=context.state.page;
		 	   Vue.http.post('/yich/BusinessTemplate',obj,{emulateJSON:true}).then((response) => {
		 		  window.checkErrorVue(response);
				    var a=response.data;
				    context.state.allpage=a.totalPages;
				    context.state.list=a.List;
				   
				     }, (response) => {
	    			   console.log('error');
	    		 });
		},
	}
export default new Vuex.Store({
	state,
	mutations,
	actions
 })
