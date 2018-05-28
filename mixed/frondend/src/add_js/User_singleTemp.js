import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		page:1,
		allpage:0,
		list:'',
		supshopId:'',
		show:true,
 }
const mutations = {
		page(state,n){
			state.page=n.page;
		},
}

const actions={
		Ajax(context){
			var obj={};
			obj.supshopId=context.state.supshopId;
			obj.page=context.state.page;
		 	   Vue.http.post('/yich/BusinessTemplatePartner',obj,{emulateJSON:true}).then((response) => {
		 		  context.state.show=false;
		 		  setTimeout(function(){
		 			 context.state.show=true;
		 		  },0);
				    var a=response.data;
				    context.state.allpage=a.totalPages;
				    context.state.list=a.list;
				    
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
