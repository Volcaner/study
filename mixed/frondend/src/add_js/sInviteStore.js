/*
 * 仓储-合作邀请
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	haveStarData:'',//已邀请数据
	listStarData:'',//邀请记录数据
	searchSta:'ing',//查询状态{已邀请ing&申请记录A}
	searchName:'',//查询名字
	sortSta:'apply_time',//排序状态
	sortStaP:'apply_time',//排序状态
	coopId:'',
	applySta:'ALL',//邀请记录状态
	page:1, //页码
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
	FYAjaxSta:'',//分页请求地址的状态
	
};
const mutations={
	page(state,obj){//页码
		state.page=obj.page;
	},
	//已邀请ajax
	haveStarAjax(state){
		Vue.http.post('/yich/supVisited?page='+state.page+'&order='+state.sortStaP).then((response)=>{
			//success
			 window.checkErrorVue(response);
			 if(typeof (response.data.check)!='undefined' && response.data.check){
				 if(response.data.totalPage<1){
						state.showFeny = false;
						state.zonPage = 1;
					}else{
						state.showFeny = true;
						state.zonPage = response.data.totalPage;
					};
					if(response.data.visitList!='null'){
						haveData(response.data.visitList);
						
					}else{
						state.haveStarData ='';
					}
			 }else{
				 alert("输入不合法");
			 }
		},(response)=>{
			//error
		});
	},
	//申请记录ajax & 排序
	listStarAjax(state){
		Vue.http.post('/yich/visitedRecord?option=sup&status='+state.applySta+'&page=1&order='+state.sortSta).then((response)=>{
			//success
			 window.checkErrorVue(response);
			 if(typeof (response.data.check)!='undefined' && response.data.check){
				 if(response.data.totalPage<1){
						state.showFeny = false;
						state.zonPage = 1;
					}else{
						state.showFeny = true;
						state.zonPage = response.data.totalPage;
					};
					if(response.data.visitedList!="null"){
						listData(response.data.visitedList);
					}else{
						state.listStarData = '';
					}
			 }else{
				 alert("输入不合法");
			 }
		},(response)=>{
			//error
		});
	},
	//查询
	searchAjax(state){
		Vue.http.post('/yich/visitQuery?option=S&page=1&status='+state.searchSta+'&order='+state.sortSta+'&name='+state.searchName).then((response)=>{
			//success
			 window.checkErrorVue(response);
			 if(typeof (response.data.check)!='undefined' && response.data.check){
				 if(response.data.visitedList!="null"){
						if(state.searchSta == "ing"){
							haveData(response.data.visitedList);
						}else if(state.searchSta == "A"){
							listData(response.data.visitedList);
						}
						
					}else{
						state.haveStarData = '';
						state.listStarData = '';
					}
			 }else{
				 alert("输入不合法");
			 }
		},(response)=>{
			//error
		});
	},
	//删除记录
	deleAjax(state){
	/*	alert("你就当做删除了");*/
		Vue.http.post('/yich/deleteRecord?option=S&coopId='+state.coopId).then((response)=>{
			//success
			 window.checkErrorVue(response);
			if(response.data.result > 0){
				window.location.reload();
			}else{
				alert("删除失败！！")
			}
			
		},(response)=>{
			//error
		});
	},
	
	
};
const actions={
	haveStarAjax(context){
		context.commit("haveStarAjax")
	},
	listStarAjax(context){
		context.commit("listStarAjax")
	},
	searchAjax(context){
		context.commit("searchAjax")
	},
	//删除记录
	deleAjax(context){
		context.commit("deleAjax");
	},
	//分页-请求数据
	Ajax(context){
		if(state.FYAjaxSta == 'haveSearchfy'){
			context.commit("searchAjax");
		}else if(state.FYAjaxSta == 'haveStarfy') {
			context.commit("haveStarAjax");
		}else if(state.FYAjaxSta == 'listStarfy') {
			context.commit("listStarAjax");
		}
	},
	
};
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
//商户合作已申请
function haveData(data){
	var list = [];
	for(var i in data){
		var json={name:'',hzFrends:0,tkPercent:0,rzTime:'',aplyTime:'',aplyKinds:'新的申请',dengj:'C',dengjX:'1',supshopId:'',userId:'',wangwang:'',};
		json.name = data[i].shopName;
		json.hzFrends = data[i].business.coop_num;//合作伙伴
		if(data[i].traNum != 0 && data[i].retNum != 0){
			json.tkPercent =((data[i].retNum/data[i].traNum)*100).toFixed(2)+"%";
		}
		json.rzTime = (data[i].business.register_time).split(' ')[0];
		json.aplyTime = data[i].applyTime;
		json.supshopId = data[i].supshopId;
		json.userId = data[i].userId;
		if(data[i].coopStatus == "AV"){
			json.aplyKinds = "重新申请";
		}else if(data[i].coopStatus == "V"){
			json.aplyKinds = "新的申请";
		}
		if(data[i].business){
			if(data[i].business.wangwang){
				json.wangwang = data[i].business.wangwang;
			}
			if(data[i].business.level){
				json.dengj = data[i].business.level.split('-')[0];
				json.dengjX = parseInt(data[i].business.level.split('-')[1]);
			}
		}
		list.push(json);
	}
	
	state.haveStarData = list;
};
//商户合作申请记录
function listData(data){
	var list = [];
	for(var i in data){
		var json={name:'暂无设置店铺名称',applytime:'',shStatus:'',agreTime:'',coopId:'',supshopId:'',wangwang:'',};
		if(data[i].supName != ''){
			json.name = data[i].shopName;
		}
		json.applytime = data[i].applyTime;
		json.coopId = data[i].coopId;
		json.supshopId = data[i].supshopId;
		if(data[i].coopStatus == "A"){
			json.shStatus = "审核同意";
			json.agreTime = data[i].agreeTime;
		}else if(data[i].coopStatus == "D"){
			json.shStatus = "审核拒绝";
			json.agreTime = data[i].handTime;
		}
		if(data[i].business){
			if(data[i].business.wangwang){
				json.wangwang = data[i].business.wangwang;
			}
		}
		list.push(json);
	}
	
	state.listStarData = list;
}