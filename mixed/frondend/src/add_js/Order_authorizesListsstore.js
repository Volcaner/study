import Vue from 'vue'
import Vuex from 'vuex'
import vueResource from 'vue-resource'
Vue.use(Vuex);
Vue.use(vueResource);
const state = {//页面状态
	allstate:{type:"people",state:'no',data:''},//总页面状态type:people,company,state:no is pass//这里用于分页的ajax判断//data，保存查询中的数据的分页
	tablelist:[],//table显示
}
const mutations = {		
	page(state,n){
		state.allstate.data.pageNo=n.page;
	},
}
const actions={
	Ajax(state){
		state.state.tablelist.splice(0);
		Vue.http.post('/yich/AuthorizesLists',state.state.allstate.data,{emulateJSON:true})
		.then((response)=>{
			window.checkErrorVue(response);
			var list=response.body.rnalist;
			for(var k in list){
				state.state.tablelist.push({nickname:list[k].nickname,time1:list[k].apply_time,time2:list[k].examine_time,id:list[k].rna_id,uid:list[k].user_id,o_or_c:list[k].o_or_c});	
			}
		},(response)=>{
		})
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})