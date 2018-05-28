import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		allpage:1,
		data:{//ajax数据
			username:'',
			realState:'',
			start_time:'',
			end_time:'',
			storageStage:'',
			pageNo:1,	
		},
		list:[
		      //{userName,supName,payTime,serviceDays,finishedTime,}
		],
}
const mutations = {
	page(state,n){
		state.data.pageNo=n.page;
	},	
}
const actions={
	Ajax(context){
		Vue.http.post('/yich/LineStorageServlet',context.state.data,{emulateJSON:true})
		.then((response)=>{
			window.checkErrorVue(response);
			context.state.allpage=response.body.totalPage;
			context.state.list.splice(0);
			var list=response.body.LineStorageSettled;
			for(var key in list){
				let username=list[key].username;
				let realState=list[key].is_real_name=='N'?'未实名':'已实名';
				let examine_time = '';
				if(list[key].examine_time){
					examine_time=list[key].examine_time.split(' ')[0];
				}
				let storageStage=list[key].whe_adm=='NY'?'已入驻':list[key].whe_adm=='NS'?'已入驻':'未入驻';
				let user_id=list[key].user_id;
				context.state.list.push({username:username,realState:realState,examine_time:examine_time,storageStage:storageStage,user_id:user_id});	
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