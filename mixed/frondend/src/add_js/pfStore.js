/*服务评分*/
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const state={
	sortStaPf:'score_time',
	sortStaPfN:'score_time',
	sumDataNumT:0,
	sumDataNumN:0,
	timeDataList:'',//按时间搜索数据
	nameDatalist:'',//按名称搜索数据
	timeCon:'',//按时间查找的时间
	nameCon:'',//按名称查找
	nameStarTime:'',
	AjaxSta:'timeAjax',
	supShopId:'',
	page:1,  
	zonPage:1,
	showFeny:false,
	wangwang:'',//采购商查找时的旺旺
}
const mutations={
	page(state,obj){
		state.page=obj.page;
	},
	timeStarAjax(state){
		Vue.http.post('/yich/queryScoreTime?page='+state.page+'&order='+state.sortStaPf+'&time='+state.timeCon).then((response)=>{
			 window.checkErrorVue(response);
			state.sumDataNumT = response.data.count;
			if(parseInt(response.data.page)<1){
				state.showFeny = false;
				state.zonPage=1;
			}else{
				state.showFeny = true;
				state.zonPage = response.data.page;
			}
			timeData(response.data.list);
			state.supShopId = response.data.supShopId;
		},(error)=>{
		});
	},
	nameStarAjax(state){
		Vue.http.post('/yich/queryScoreName?page='+state.page+'&order='+state.sortStaPfN+'&name='+state.nameCon).then((response)=>{
			 window.checkErrorVue(response);
			state.sumDataNumN = response.data.count;
			if(parseInt(response.data.page)<1){
				state.showFeny = false;
				state.zonPage=1;
			}else{
				state.showFeny = true;
				state.zonPage = response.data.page;
			}
			if(response.data.list && response.data.list.length>0){
				nameData(response.data.list);
				state.wangwang = response.data.list[0].user?response.data.list[0].user.wangwang:'';
			}
		},(error)=>{
		});
	},
	
}
const actions={
	timeStarAjax(context){
		context.commit("timeStarAjax");
	},
	nameStarAjax(context){
		context.commit("nameStarAjax");
	},
	Ajax(context){
		if(state.AjaxSta == "timeAjax"){
			context.commit("timeStarAjax");
		}else if(state.AjaxSta == "nameAjax"){
			context.commit("nameStarAjax");
		}
	}
}
function timeData(data){
	var list = [];
	if(data!='null'){
		for(var i in data){
			var json = {pfname:'',pfstarTime:'',pftime:'',pftongjTime:'',pfnum:'',userId:'',wangwang:''};
			json.pfname = data[i].shopName;
			json.pfstarTime = data[i].coopTime;
			json.pftime = data[i].time;
			json.pftongjTime = data[i].time;
			json.pfnum = data[i].score;
			json.userId = data[i].user?data[i].user.user_id:'';
			json.wangwang = data[i].user?data[i].user.wangwang:'';
			list.push(json);
		};
		state.timeDataList = list;
	}else{
		state.timeDataList ='';
	}
	
}
function nameData(data){
	var list = [];
	if(data!='null'){
		for(var i in data){
			var json = {pftime:'',pfnum:'',};
			json.pftime = data[i].time;
			json.pfnum = data[i].score;
			
			list.push(json);
		};
		state.nameStarTime = data[0].coopTime;
		state.nameDatalist = list;
	}else{
		state.nameDatalist ='';
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})