/*
 * 合作邀请审核
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	titleName:'合作申请',//黑名单title数据
	haveStarData:'',//审核邀请数据
	listStarData:'',//审核记录数据
	searchSta:'ing',//查询状态{审核申请P&审核记录A}
	searchName:'',//查询名字
	sortStaA:'apply_time',//排序状态
	sortStaP:'apply_time',//排序状态
	coopId:'',
	supshopId:'',
	userId:'',
	hzHandleSta:'',//审核邀请操作状态
	applySta:'ALL',//申请记录状态
	isStopMotai:false,
	motaiTitle:'',//模态框标题
	motaiText:'',//模态框内容
	FYAjaxSta:'SHSQ',//分页请求地址的状态
	showFeny:false,//是否显示分页
	page:1, //页码
	zonPage:1,//总页码数
};
const mutations={
	page(state,obj){//页码
		state.page=obj.page;
	},
	//审核邀请ajax
	haveStarAjax(state){
		Vue.http.post('/yich/uvisit?page='+state.page+'&order='+state.sortStaP).then((response)=>{
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
						state.haveStarData='';
					};
			 }else{
				 alert("输入不合法");
			 }
			
		},(response)=>{
			//error
			console.log("err");
		});
	},
	//审核记录ajax & 排序
	listStarAjax(state){
		Vue.http.post('/yich/visitedRecord?option=U&status='+state.applySta+'&page='+state.page+'&order='+state.sortStaA).then((response)=>{
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
						state.listStarData='';
					}
			 }else{
				 alert("输入不合法");
			 }
		},(response)=>{
			//error
			console.log("err");
		});
	},
	//查询
	searchAjax(state){
		Vue.http.post('/yich/visitQuery?option=U&page='+state.page+'&status='+state.searchSta+'&order='+state.sortStaA+'&name='+state.searchName).then((response)=>{
			//success
			 window.checkErrorVue(response);
			 if(typeof (response.data.check)!='undefined' && response.data.check){
				 if(response.data.totalPage<1){
						state.showFeny = false;
						state.zonPage = 1;
					}else{
						state.showFeny = true;
						state.zonPage = response.data.totalPage;
					}
					if(response.data.visitedList!="null"){
						if(state.searchSta == "ing"){
							
							haveData(response.data.visitedList);
						}else{
					
							listData(response.data.visitedList);
						}
						
					}else{
						state.haveStarData='';
						state.listStarData='';
					}
			 }else{
				 alert("输入不合法");
			 }
		},(response)=>{
			//error
			console.log("err");
		});
	},
	//删除记录
	deleAjax(state){
		Vue.http.post('/yich/deleteRecord?option=U&coopId='+state.coopId).then((response)=>{
			//success
			 window.checkErrorVue(response);
			if(response.data.result > 0){
				window.location.reload();
			}else{
				alert("删除失败！！")
			}
			
		},(response)=>{
			//error
			console.log("err");
		});
	},
	//同意合作
	HeZuoHandle(state){
		Vue.http.post('/yich/uhandApply?option='+state.hzHandleSta+'&coopId='+state.coopId+'&userId='+state.userId+'&supShopId='+state.supshopId).then((response)=>{
			//success
			 window.checkErrorVue(response);
			if(response.data.result > 0){
				window.location.reload();
			}else{
				alert("操作失败！！")
			}
			
		},(response)=>{
			//error
			console.log("err");
		});
	},
	
	
};
const actions={
	Ajax(context){
		if(state.FYAjaxSta == 'SHSQ'){
			context.commit("haveStarAjax");
		}else if(state.FYAjaxSta == 'SHJL'){
			context.commit("listStarAjax");
		}else if(state.FYAjaxSta == 'SHSearch'){
			context.commit("searchAjax");
		}
	},
	haveStarAjax(context){
		context.commit("haveStarAjax");
	},
	listStarAjax(context){
		context.commit("listStarAjax");
	},
	searchAjax(context){
		context.commit("searchAjax");
	},
	//删除记录
	deleAjax(context){
		context.commit("deleAjax");
	},
	HeZuoHandle(context){
		context.commit("HeZuoHandle");
	},
	
};
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
//仓储合作申请-审核申请
function haveData(data){
	var list = [];
	for(var i in data){
		var json={name:'',dengj:'C',dengjX:1,hzFrends:0,tkPercent:0,rzTime:0,aplyTime:0,aplyKinds:'',coopId:'',userId:'',supshopId:'',wangwang:''};
		json.name = data[i].supName;
		json.hzFrends = data[i].coopNum;//合作伙伴
		if(data[i].retNum !=0 && data[i].traNum!=0){
			json.tkPercent =((data[i].retNum/data[i].traNum)*100).toFixed(2)+"%";
		}
		json.rzTime = (data[i].sup.openShopTime).split(' ')[0];
		json.aplyTime = data[i].applyTime.split(" ")[0];
		json.coopId = data[i].coopId;
		json.userId = data[i].userId;
		json.supshopId = data[i].supshopId;
		if(data[i].coopStatus == "AV"){
			json.aplyKinds = "重新邀请";
		}else if(data[i].coopStatus == "V"){
			json.aplyKinds = "新的邀请";
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
//仓储合作申请-审核记录
function listData(data){
	var list = [];
	for(var i in data){
		var json={name:'',applytime:'',shStatus:'',agreTime:'',coopId:'',userId:'',wangwang:''};
		json.name = data[i].supName;
		json.applytime = data[i].applyTime;
		json.coopId = data[i].coopId;
		json.userId = data[i].userId;
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