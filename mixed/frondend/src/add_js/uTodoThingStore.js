/*仓储-*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		datalist:[],
		thingId:'',//待办事项id
		sta:'',//1未读，0已读， ‘’全部，
		showFeny:false,//是否显示分页
		page:1, //页码
		zonPage:1,//总页码数
 }
const mutations = {
		page(state,obj){//页码
			state.page=obj.page;
		},
		starAjaxData(state){
			Vue.http.post('/yich/UserThingList',{page:state.page,status:'a',type:state.sta},{emulateJSON:true}).then((response) => {
				window.checkErrorVue(response);
				var list = [];
				typeof(response.data)=='string'?list=JSON.parse(response.data):list=response.data;
				if(list.totalpages<1){
					state.showFeny = false;
					state.zonPage = 1;
				}else{
					state.showFeny = true;
					state.zonPage = list.totalpages;
				};
				if(list.list && list.list.length>0){
					getTodoThing(list.list);
				}else{
					state.datalist = [];
				}
				
				// 响应成功回调
			}, (response) => {
				// 响应错误回调
				console.log("error");
		});
		},
}
const actions={
		starAjaxData(context){
			context.commit('starAjaxData');
		},
		delAjax(context){
			Vue.http.post('/yich/UserDeleteThing',{thingId:state.thingId},{emulateJSON:true}).then((response) => {
				window.checkErrorVue(response);
				if(response.data.result == '1'){
					context.commit('starAjaxData');
				}else{
					alert("删除失败！")
				}
				// 响应成功回调
			}, (response) => {
				// 响应错误回调
				console.log("error");
			});
		},
		Ajax(context){
			context.commit("starAjaxData");
		},
}
export default new Vuex.Store({
	state,
	mutations,
	actions
 })
function getTodoThing(data){
	var arr=[];
	for(var i in data){
		var json = {};
		json.name = data[i].content;
		json.url = data[i].url;
		json.staFont = data[i].isCheck=="1"?"未读":"已读";
		json.status = data[i].isCheck;
		json.tid = data[i].thingId;
		json.time = data[i].buildTime;
		arr.push(json);
	}
	state.datalist = arr;
}