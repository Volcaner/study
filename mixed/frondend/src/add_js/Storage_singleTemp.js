import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		page:1,
		allpage:0,
		list:'',
		userid:'',
		userName:'',
		wangwang:'',
		
 }
const mutations = {
		page(state,n){
			state.page=n.page;
		},
}

const actions={
		Ajax(context){
			var obj={};
			obj.userid=context.state.userid;
			obj.page=context.state.page;
		 	   Vue.http.post('/yich/TemplatePartner',obj,{emulateJSON:true}).then((response) => {
		 		 /* window.checkErrorVue(response);*/
				    var a=response.data;
				    context.state.allpage=a.totalPages;
				    context.state.list=a.list;
				    context.state.userName = a.user?a.user.name:'';
				    context.state.wangwang = a.user?a.user.wangwang:'';
				    
	    			  }, (response) => {
	    		 });
		},
	}
export default new Vuex.Store({
	state,
	mutations,
	actions
 })
